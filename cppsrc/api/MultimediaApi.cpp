// ReSharper disable CppExpressionWithoutSideEffects
#include "MultimediaApi.h"

Napi::FunctionReference ClassExample::_constructor;

Napi::Object ClassExample::init(const Napi::Env env, const Napi::Object exports)
{
    Napi::HandleScope scope(env);

    const Napi::Function func = DefineClass(env, "ClassExample", {
                                                InstanceMethod("open", &ClassExample::open),
                                            });

    _constructor = Napi::Persistent(func);
    _constructor.SuppressDestruct();

    exports.Set("ClassExample", func);
    return exports;
}

ClassExample::ClassExample(const Napi::CallbackInfo& info) : ObjectWrap(info)
{
    this->_actualClass = new MultimediaSubsystem();
}


void ClassExample::open(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() != 1 || !info[0].IsString())
    {
        Napi::TypeError::New(env, "String expected").ThrowAsJavaScriptException();
    }

    const auto toAdd = info[0].As<Napi::String>();
#ifdef UNICODE
    const auto string = toAdd.Utf16Value();
#else
    const auto string = toAdd.Utf8Value();
#endif
    this->_actualClass->open(const_cast<LPTSTR>(string.c_str()));
}