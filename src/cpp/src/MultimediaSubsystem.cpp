#include "MultimediaSubsystem.h"

HRESULT MultimediaSubsystem::create()
{
    auto hr = DirectSoundCreate8(nullptr, &_lpDirectSound, nullptr);
    if (SUCCEEDED(hr))
    {
        hr = _lpDirectSound->SetCooperativeLevel(GetDesktopWindow(), DSSCL_PRIORITY);
        if (SUCCEEDED(hr))
            hr = getListener();
    }
    return hr;
}

HRESULT MultimediaSubsystem::earlyClose(const HMMIO handle)
{
    mmioClose(handle, 0);
    return DSERR_BADFORMAT;
}

HRESULT MultimediaSubsystem::open(const LPTSTR fileName)
{
    HRESULT hr;
    memset(&_waveFormat, 0, sizeof(WAVEFORMATEX));
    MMIOINFO info = {};
    if (const HMMIO handle = mmioOpen(fileName, &info, MMIO_READ | MMIO_ALLOCBUF))
    {
        MMCKINFO infoParent;
        infoParent.fccType = mmioFOURCC('W', 'A', 'V', 'E');
        if (mmioDescend(handle, &infoParent, nullptr, MMIO_FINDRIFF))
            return earlyClose(handle);

        MMCKINFO infoSubchunk;
        infoSubchunk.ckid = mmioFOURCC('f', 'm', 't', ' ');
        if (mmioDescend(handle, &infoSubchunk, &infoParent, MMIO_FINDCHUNK))
            return earlyClose(handle);

        const long fmtSize = infoSubchunk.cksize;  // NOLINT(cppcoreguidelines-narrowing-conversions)
        if (mmioRead(handle, reinterpret_cast<HPSTR>(&_waveFormat), fmtSize) != fmtSize)
            return earlyClose(handle);

        mmioAscend(handle, &infoSubchunk, 0);

        infoSubchunk.ckid = mmioFOURCC('d', 'a', 't', 'a');
        if (mmioDescend(handle, &infoSubchunk, &infoParent, MMIO_FINDCHUNK))
            return earlyClose(handle);

        _soundDataLength = infoSubchunk.cksize;  // NOLINT(cppcoreguidelines-narrowing-conversions)
        if (_soundDataLength == 0L)
            return earlyClose(handle);

        _soundData = static_cast<char*>(malloc(_soundDataLength));
        if (mmioRead(handle, _soundData, _soundDataLength) != _soundDataLength)
            return earlyClose(handle);

        mmioClose(handle, 0);

        hr = createBasicBuffer(_soundDataLength);
        if (SUCCEEDED(hr))
            hr = appWriteDataToBuffer();
    }
    else
    {
        switch (info.wErrorRet)
        {
        case MMIOERR_ACCESSDENIED:
        case MMIOERR_SHARINGVIOLATION:
            hr = DSERR_ACCESSDENIED;
            break;
        case MMIOERR_PATHNOTFOUND:
        case MMIOERR_INVALIDFILE:
            hr = DSERR_INVALIDPARAM;
            break;
        default:
            hr = DSERR_GENERIC;
            break;
        }
    }
    return hr;
}

HRESULT MultimediaSubsystem::createBasicBuffer(const DWORD dwBufferBytes)
{
    DSBUFFERDESC bufferDescriptor = {};
    bufferDescriptor.dwSize = sizeof(DSBUFFERDESC);
    bufferDescriptor.dwFlags =
    DSBCAPS_CTRL3D |
    DSBCAPS_CTRLFREQUENCY |
    DSBCAPS_CTRLFX |
    DSBCAPS_CTRLVOLUME |
    DSBCAPS_GLOBALFOCUS;
    bufferDescriptor.dwBufferBytes = dwBufferBytes;
    bufferDescriptor.lpwfxFormat = &_waveFormat;
    bufferDescriptor.guid3DAlgorithm = DS3DALG_DEFAULT;

    // Create buffer.

    LPDIRECTSOUNDBUFFER directSoundBuffer = nullptr;
    HRESULT hr = _lpDirectSound->CreateSoundBuffer(&bufferDescriptor, &directSoundBuffer, nullptr);
    if (SUCCEEDED(hr))
    {
        hr = directSoundBuffer->QueryInterface(IID_IDirectSoundBuffer8, reinterpret_cast<LPVOID*>(&_soundBuffer));
        if (SUCCEEDED(hr))
            hr = directSoundBuffer->QueryInterface(
                IID_IDirectSound3DBuffer8, reinterpret_cast<LPVOID*>(&_soundBuffer3D));

        directSoundBuffer->Release();
    }
    return hr;
}

HRESULT MultimediaSubsystem::appWriteDataToBuffer() const
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
        if (ptr1)
            CopyMemory(ptr1, _soundData, bytes1);

        if (ptr2)
            CopyMemory(ptr2, _soundData+bytes1, bytes2);

        hr = _soundBuffer->Unlock(ptr1, bytes1, ptr2, bytes2);
    }
    return hr;
}

HRESULT MultimediaSubsystem::play() const
{
    return _soundBuffer->Play(0, 0, DSBPLAY_LOOPING);
}

HRESULT MultimediaSubsystem::stop() const
{
    return _soundBuffer->Stop();
}

WAVEFORMATEX MultimediaSubsystem::getWaveFormat() const
{
    return _waveFormat;
}

D3DVALUE MultimediaSubsystem::getDopplerFactor() const
{
    D3DVALUE value;
    const auto hr = _listener->GetDopplerFactor(&value);
    return SUCCEEDED(hr) ? value : -1;
}

D3DVALUE MultimediaSubsystem::getMinDistance() const
{
    D3DVALUE value;
    const auto hr = _soundBuffer3D->GetMinDistance(&value);
    return SUCCEEDED(hr) ? value : -1;
}

D3DVALUE MultimediaSubsystem::getMaxDistance() const
{
    D3DVALUE value;
    const auto hr = _soundBuffer3D->GetMaxDistance(&value);
    return SUCCEEDED(hr) ? value : -1;
}

D3DVECTOR MultimediaSubsystem::getPosition() const
{
    D3DVECTOR value;
    const auto hr = _soundBuffer3D->GetPosition(&value);
    return SUCCEEDED(hr) ? value : D3DVECTOR{-1, -1, -1};
}

D3DVECTOR MultimediaSubsystem::getVelocity() const
{
    D3DVECTOR value;
    const auto hr = _soundBuffer3D->GetVelocity(&value);
    return SUCCEEDED(hr) ? value : D3DVECTOR{-1, -1, -1};
}

D3DVALUE MultimediaSubsystem::getVolume() const
{
    long value;
    const auto hr = _soundBuffer->GetVolume(&value);
    return SUCCEEDED(hr) ? static_cast<float>(value)/100 : -1;
}

DWORD MultimediaSubsystem::getFrequency() const
{
    DWORD value;
    const auto hr = _soundBuffer->GetFrequency(&value);
    return SUCCEEDED(hr) ? value : -1;
}

HRESULT MultimediaSubsystem::setDopplerFactor(const D3DVALUE value) const
{
    return _listener->SetDopplerFactor(value, DS3D_IMMEDIATE);
}

HRESULT MultimediaSubsystem::setMinDistance(const D3DVALUE value) const
{
    return _soundBuffer3D->SetMinDistance(value, DS3D_IMMEDIATE);
}

HRESULT MultimediaSubsystem::setMaxDistance(const D3DVALUE value) const
{
    return _soundBuffer3D->SetMaxDistance(value, DS3D_IMMEDIATE);
}

HRESULT MultimediaSubsystem::setPosition(const D3DVECTOR value) const
{
    return _soundBuffer3D->SetPosition(value.x, value.y, value.z, DS3D_IMMEDIATE);
}

HRESULT MultimediaSubsystem::setVelocity(const D3DVECTOR value) const
{
    return _soundBuffer3D->SetVelocity(value.x, value.y, value.z, DS3D_IMMEDIATE);
}

HRESULT MultimediaSubsystem::setVolume(const long value) const
{
    return _soundBuffer->SetVolume(value * 100);
}

HRESULT MultimediaSubsystem::setFrequency(const DWORD value) const
{
    return _soundBuffer->SetFrequency(value);
}

HRESULT MultimediaSubsystem::getListener()
{
    DSBUFFERDESC bufferDesc = {};
    bufferDesc.dwSize = sizeof(DSBUFFERDESC);
    bufferDesc.dwFlags = DSBCAPS_CTRL3D | DSBCAPS_PRIMARYBUFFER;

    LPDIRECTSOUNDBUFFER primary = nullptr;
    HRESULT hr = _lpDirectSound->CreateSoundBuffer(&bufferDesc, &primary, nullptr);
    if (SUCCEEDED(hr))
    {
        hr = primary->QueryInterface(IID_IDirectSound3DListener8, reinterpret_cast<LPVOID*>(&_listener));
        primary->Release();
    }
    return hr;
}

char* MultimediaSubsystem::getBytes() const
{
    return _soundData;
}

long MultimediaSubsystem::getLength() const
{
    return _soundDataLength;
}
