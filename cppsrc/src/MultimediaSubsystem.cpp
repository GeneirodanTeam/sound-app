#include "MultimediaSubsystem.h"

MultimediaSubsystem::MultimediaSubsystem()
{
    if (auto hr = DirectSoundCreate8(nullptr, &_lpDirectSound, nullptr); SUCCEEDED(hr))
        hr = _lpDirectSound->SetCooperativeLevel(GetDesktopWindow(), DSSCL_PRIORITY);
}

void MultimediaSubsystem::open(const LPTSTR fileName)
{
    memset(&_waveFormat, 0, sizeof(WAVEFORMATEX));
    MMCKINFO infoParent, infoSubchunk;
    if (const HMMIO handle = mmioOpen(fileName, nullptr, MMIO_READ | MMIO_ALLOCBUF))
    {
        infoParent.fccType = mmioFOURCC('W', 'A', 'V', 'E');
        if (mmioDescend(handle, &infoParent, nullptr, MMIO_FINDRIFF))
        {
            //Error("This is not a waveform-audio file.");
            mmioClose(handle, 0);
            return;
        }
        infoSubchunk.ckid = mmioFOURCC('f', 'm', 't', ' ');
        if (mmioDescend(handle, &infoSubchunk, &infoParent, MMIO_FINDCHUNK))
        {
            //Error("Waveform-audio file has no "FMT" chunk.");
            mmioClose(handle, 0);
            return;
        }
        if (const long fmtSize = infoSubchunk.cksize; mmioRead(handle, reinterpret_cast<HPSTR>(&_waveFormat), fmtSize)
            != fmtSize)
        {
            //Error("Failed to read format chunk.");
            mmioClose(handle, 0);
            return;
        }
        mmioAscend(handle, &infoSubchunk, 0);
        infoSubchunk.ckid = mmioFOURCC('d', 'a', 't', 'a');
        if (mmioDescend(handle, &infoSubchunk, &infoParent, MMIO_FINDCHUNK))
        {
            //Error("Waveform-audio file has no data chunk.");
            mmioClose(handle, 0);
            return;
        }

        _soundDataLength = infoSubchunk.cksize;  // NOLINT(cppcoreguidelines-narrowing-conversions)
        if (_soundDataLength == 0L)
        {
            //Error("The data chunk contains no data.");
            mmioClose(handle, 0);
            return;
        }

        _soundData = static_cast<char*>(malloc(_soundDataLength));
        if (mmioRead(handle, _soundData, _soundDataLength) != _soundDataLength)
        {
            //Error("Failed to read data chunk.");
            mmioClose(handle, 0);
            return;
        }

        mmioClose(handle, 0);
        createBasicBuffer(_soundDataLength);
        appWriteDataToBuffer();
    }
    else
    {
        //Error("Failed to open file.");
    }
}

HRESULT MultimediaSubsystem::createBasicBuffer(DWORD dwBufferBytes)
{
    DSBUFFERDESC bufferDescriptor = {};
    bufferDescriptor.dwSize = sizeof(DSBUFFERDESC);
    bufferDescriptor.dwFlags =
    DSBCAPS_CTRL3D |
    DSBCAPS_CTRLFREQUENCY |
    DSBCAPS_CTRLFX |
    //DSBCAPS_CTRLPAN |
    DSBCAPS_CTRLVOLUME |
    //    DSBCAPS_LOCSOFTWARE|
    DSBCAPS_GLOBALFOCUS;
    bufferDescriptor.dwBufferBytes = dwBufferBytes;
    bufferDescriptor.lpwfxFormat = &_waveFormat;
    bufferDescriptor.guid3DAlgorithm = DS3DALG_DEFAULT;//DS3DALG_HRTF_FULL;

    // Create buffer.

    LPDIRECTSOUNDBUFFER directSoundBuffer = nullptr;
    HRESULT hr = _lpDirectSound->CreateSoundBuffer(&bufferDescriptor, &directSoundBuffer, nullptr);
    if (SUCCEEDED(hr))
    {
        hr = directSoundBuffer->QueryInterface(IID_IDirectSoundBuffer8, reinterpret_cast<LPVOID*>(&_soundBuffer));
        directSoundBuffer->Release();
    }
    return hr;
}

bool MultimediaSubsystem::appWriteDataToBuffer() const
{
    void *ptr1, *ptr2;
    DWORD bytes1, bytes2;

    HRESULT hr = _soundBuffer->Lock(0, 0, &ptr1, &bytes1, &ptr2, &bytes2, DSBLOCK_ENTIREBUFFER);

    if (DSERR_BUFFERLOST == hr)
    {
        hr = _soundBuffer->Restore();
        if (SUCCEEDED(hr))
            hr = _soundBuffer->Lock(0, 0, &ptr1, &bytes1, &ptr2, &bytes2, DSBLOCK_ENTIREBUFFER);
    }
    if (SUCCEEDED(hr))
    {
        // Write to pointers.
        if (ptr1)
            CopyMemory(ptr1, _soundData, bytes1);
        if (ptr2)
            CopyMemory(ptr2, _soundData+bytes1, bytes2);

        // Release the data back to DirectSound.

        hr = _soundBuffer->Unlock(ptr1, bytes1, ptr2, bytes2);
        return SUCCEEDED(hr);
    }
    return false;
}

bool MultimediaSubsystem::play() const
{
    const auto hr = _soundBuffer->Play(0, 0, DSBPLAY_LOOPING);
    return SUCCEEDED(hr);
}
