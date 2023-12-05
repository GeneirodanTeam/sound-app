#include <iostream>

#include "MultimediaSubsystem.h"
#pragma comment(lib, "dsound.lib")
#pragma comment(lib, "Winmm.lib")
#pragma comment(lib, "Dxguid.lib")

int main(int argc, char* argv[])
{
    auto sub = MultimediaSubsystem();
    HRESULT hr = sub.create();
    TCHAR fileName[] = TEXT("D:\\Downloads\\record.wav");
    // hr = sub.open(fileName);
    // hr = sub.play();
    bool b = true;
    while (b)
    {
        hr = 0;
        int action;
        std::cin >> action;
        float x, y, z;
        DWORD d;
        switch (action)
        {
        case 1:
            std::cin >> x;
            hr = sub.setVolume(x);
            break;
        case 2:
            std::cin >> d;
            hr = sub.setFrequency(d); 
            break;
        case 3:
            std::cin >> x;
            hr = sub.setDopplerFactor(x);
            break;
        case 4:
            std::cin >> x;
            hr = sub.setMinDistance(x);
            break;
        case 5:
            std::cin >> x;
            hr = sub.setMaxDistance(x);
            break;
        case 6:
            std::cin >> x >> y >> z;
            hr = sub.setPosition(D3DVECTOR{x,y,z});
            break;
        case 7:
            std::cin >> x >> y >> z;
            hr = sub.setVelocity(D3DVECTOR{x,y,z});
            break;
        case 0:
            b = false;
            break;
        default:
            std::cout << "Try again" << std::endl;
            break;
        }
        std::cout << std::hex << hr << std::endl;
    }
    return 0;
}
