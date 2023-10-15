#include <iostream>

#include "MultimediaSubsystem.h"
#pragma comment(lib, "dsound.lib")
#pragma comment(lib, "Winmm.lib")
#pragma comment(lib, "Dxguid.lib")

int main(int argc, char* argv[])
{
    auto sub = MultimediaSubsystem();
    TCHAR fileName[] = TEXT("C:\\Sample.wav");
    sub.open(fileName);
    char c;
    std::cin >> c;
    return 0;
}
