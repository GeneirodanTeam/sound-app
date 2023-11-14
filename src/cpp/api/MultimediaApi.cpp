// ReSharper disable CppExpressionWithoutSideEffects
#include "MultimediaApi.h"

Napi::FunctionReference MultimediaApi::_constructor;

Napi::Object MultimediaApi::init(const Napi::Env env, const Napi::Object exports)
{
    Napi::HandleScope scope(env);

    const Napi::Function func = DefineClass(env, "MultimediaApi", {
                                                InstanceMethod("open", &MultimediaApi::open),
                                                InstanceMethod("create", &MultimediaApi::create),
                                                InstanceMethod("play", &MultimediaApi::play),
                                                InstanceMethod("stop", &MultimediaApi::stop),
                                                InstanceMethod("getWaveFormat", &MultimediaApi::getWaveFormat),
                                                InstanceMethod("getDopplerFactor", &MultimediaApi::getDopplerFactor),
                                                InstanceMethod("getMinDistance", &MultimediaApi::getMinDistance),
                                                InstanceMethod("getMaxDistance", &MultimediaApi::getMaxDistance),
                                                InstanceMethod("getPosition", &MultimediaApi::getPosition),
                                                InstanceMethod("getVelocity", &MultimediaApi::getVelocity),
                                                InstanceMethod("getVolume", &MultimediaApi::getVolume),
                                                InstanceMethod("getFrequency", &MultimediaApi::getFrequency),
                                                InstanceMethod("setDopplerFactor", &MultimediaApi::setDopplerFactor),
                                                InstanceMethod("setMinDistance", &MultimediaApi::setMinDistance),
                                                InstanceMethod("setMaxDistance", &MultimediaApi::setMaxDistance),
                                                InstanceMethod("setPosition", &MultimediaApi::setPosition),
                                                InstanceMethod("setVelocity", &MultimediaApi::setVelocity),
                                                InstanceMethod("setVolume", &MultimediaApi::setVolume),
                                                InstanceMethod("setFrequency", &MultimediaApi::setFrequency)
                                            });

    _constructor = Napi::Persistent(func);
    _constructor.SuppressDestruct();

    exports.Set("MultimediaApi", func);
    return exports;
}

MultimediaApi::MultimediaApi(const Napi::CallbackInfo& info) : ObjectWrap(info)
{
    this->_actualClass = new MultimediaSubsystem();
}


Napi::Value MultimediaApi::open(const Napi::CallbackInfo& info)
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
    const auto answer = this->_actualClass->open(const_cast<LPTSTR>(string.c_str()));
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::create(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const long answer = this->_actualClass->create();
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::play(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const long answer = this->_actualClass->play();
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::stop(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const long answer = this->_actualClass->stop();
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::getDopplerFactor(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const float answer = this->_actualClass->getDopplerFactor();
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::getMinDistance(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const float answer = this->_actualClass->getMinDistance();
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::getMaxDistance(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const float answer = this->_actualClass->getMaxDistance();
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::getVolume(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const long answer = this->_actualClass->getVolume();
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::getFrequency(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const long answer = this->_actualClass->getFrequency();
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::setDopplerFactor(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() != 1 || !info[0].IsNumber())
    {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }

    const auto num = info[0].As<Napi::Number>(); // convert to js number

    const long answer = this->_actualClass->setDopplerFactor(num.FloatValue());
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::setMinDistance(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() != 1 || !info[0].IsNumber())
    {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }

    const auto num = info[0].As<Napi::Number>();

    const long answer = this->_actualClass->setMinDistance(num.FloatValue());
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::setMaxDistance(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() != 1 || !info[0].IsNumber())
    {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }

    const auto num = info[0].As<Napi::Number>();

    const long answer = this->_actualClass->setMaxDistance(num.FloatValue());
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::setVolume(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() != 1 || !info[0].IsNumber())
    {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }

    const auto num = info[0].As<Napi::Number>();

    const long answer = this->_actualClass->setVolume(num.Int32Value());
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::setFrequency(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() != 1 || !info[0].IsNumber())
    {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }

    const auto num = info[0].As<Napi::Number>();

    const long answer = this->_actualClass->setFrequency(num.Int32Value());
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::getPosition(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const auto [x, y, z] = this->_actualClass->getPosition();
    auto arr = Napi::Float32Array::New(info.Env(), 3);
    arr[0] = x;
    arr[1] = y;
    arr[2] = z;
    return arr;
}

Napi::Value MultimediaApi::setPosition(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() != 3 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber())
    {
        Napi::TypeError::New(env, "x,y,z expected").ThrowAsJavaScriptException();
    }

    const auto num = info[0].As<Napi::Number>();
    const auto secondNum = info[0].As<Napi::Number>();
    const auto thirdNum = info[0].As<Napi::Number>();

    const auto answer = this->_actualClass->setPosition(D3DVECTOR{num.FloatValue(), secondNum.FloatValue(), thirdNum.FloatValue()});
    return Napi::Number::New(info.Env(), answer);;
}

Napi::Value MultimediaApi::getVelocity(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const auto [x, y, z] = this->_actualClass->getVelocity();
    auto arr = Napi::Float32Array::New(info.Env(), 3);
    arr[0] = x;
    arr[1] = y;
    arr[2] = z;
    return arr;
}

Napi::Value MultimediaApi::setVelocity(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() != 3 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber())
    {
        Napi::TypeError::New(env, "x,y,z expected").ThrowAsJavaScriptException();
    }

    const auto num = info[0].As<Napi::Number>();
    const auto secondNum = info[0].As<Napi::Number>();
    const auto thirdNum = info[0].As<Napi::Number>();

    const auto answer = this->_actualClass->setVelocity(D3DVECTOR{ num.FloatValue(), secondNum.FloatValue(), thirdNum.FloatValue() });
    return Napi::Number::New(info.Env(), answer);
}

Napi::Value MultimediaApi::getWaveFormat(const Napi::CallbackInfo& info)
{
    const Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    const auto [wFormatTag, nChannels, nSamplesPerSec, nAvgBytesPerSec, nBlockAlign, wBitsPerSample, cbSize] = this->_actualClass->getWaveFormat();
    auto arr = Napi::Uint32Array::New(info.Env(), 5);
    arr[0] = nChannels;
    arr[1] = nSamplesPerSec;
    arr[2] = nAvgBytesPerSec;
    arr[3] = nBlockAlign;
    arr[4] = wBitsPerSample;
    return arr;
}
