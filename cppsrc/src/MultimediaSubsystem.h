#pragma once
#include <windows.h>
#include <dsound.h>
#include <string>

class MultimediaSubsystem
{
    LPDIRECTSOUND8 _lpDirectSound;
    WAVEFORMATEX _waveFormat = {};
    LPDIRECTSOUNDBUFFER8 _soundBuffer = nullptr;
    char* _soundData = nullptr;
    long _soundDataLength = 0;

public:
    MultimediaSubsystem();

    void open(LPTSTR fileName);
    HRESULT createBasicBuffer(DWORD dwBufferBytes);
    bool appWriteDataToBuffer() const;
    bool play() const;
};
