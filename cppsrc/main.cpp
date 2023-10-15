#include <napi.h>

#include "api/MultimediaApi.h"
#pragma comment(lib, "dsound.lib")
#pragma comment(lib, "Winmm.lib")
#pragma comment(lib, "Dxguid.lib")


Napi::Object initAll(const Napi::Env env, const Napi::Object exports) {
    return ClassExample::init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, initAll)
