#pragma once
#include <windows.h>
#include <dsound.h>
#include <string>

class MultimediaSubsystem
{
    LPDIRECTSOUND8 _lpDirectSound = nullptr;
    LPDIRECTSOUNDBUFFER8 _soundBuffer = nullptr;
    LPDIRECTSOUND3DBUFFER8 _soundBuffer3D = nullptr;
    LPDIRECTSOUND3DLISTENER8 _listener = nullptr;
    WAVEFORMATEX _waveFormat = {};
    char* _soundData = nullptr;
    long _soundDataLength = 0;

    static HRESULT earlyClose(HMMIO handle);
    HRESULT createBasicBuffer(DWORD dwBufferBytes);
    HRESULT appWriteDataToBuffer() const;
    HRESULT getListener();

public:
    char* getBytes() const;
    long getLength() const;

    HRESULT create();
    HRESULT open(LPTSTR fileName);
    HRESULT play() const;
    HRESULT stop() const;

    WAVEFORMATEX getWaveFormat() const; 

    D3DVALUE getDopplerFactor() const;

    // D3DVALUE getConeAngles() const;
    // D3DVALUE getConeOrientation() const;
    // D3DVALUE getConeOutsideVolume() const;

    D3DVALUE getMinDistance() const;
    D3DVALUE getMaxDistance() const;
    D3DVECTOR getPosition() const;
    D3DVECTOR getVelocity() const; 

    D3DVALUE getVolume() const;
    DWORD getFrequency() const;

    HRESULT setDopplerFactor(D3DVALUE value) const;

    // D3DVALUE setConeAngles() const;
    // D3DVALUE setConeOrientation() const ;
    // D3DVALUE setConeOutsideVolume() const ;

    HRESULT setMinDistance(D3DVALUE value) const;
    HRESULT setMaxDistance(D3DVALUE value) const;
    HRESULT setPosition(D3DVECTOR value) const; 
    HRESULT setVelocity(D3DVECTOR value) const; 

    
    HRESULT setVolume(D3DVALUE value) const;
    HRESULT setFrequency(DWORD value) const;
    
};
