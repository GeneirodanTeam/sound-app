#pragma once
#include <napi.h>
#include "MultimediaSubsystem.h"

class MultimediaApi final : public Napi::ObjectWrap<MultimediaApi>
{
public:
    static Napi::Object init(Napi::Env env, Napi::Object exports); //Init function for setting the export key to JS
    explicit MultimediaApi(const Napi::CallbackInfo& info); //Constructor to initialise

private:
    static Napi::FunctionReference
    _constructor; //reference to store the class definition that needs to be exported to JS

    Napi::Value open(const Napi::CallbackInfo& info);
    MultimediaSubsystem* _actualClass; //internal instance of actualclass used to perform actual operations.

    // create functions
    Napi::Value create(const Napi::CallbackInfo& info);
    Napi::Value play(const Napi::CallbackInfo& info);
    Napi::Value stop(const Napi::CallbackInfo& info);

    Napi::Value getWaveFormat(const Napi::CallbackInfo& info);

    Napi::Value getDopplerFactor(const Napi::CallbackInfo& info);

    Napi::Value getMinDistance(const Napi::CallbackInfo& info);
    Napi::Value getMaxDistance(const Napi::CallbackInfo& info);
    Napi::Value getPosition(const Napi::CallbackInfo& info);
    Napi::Value getVelocity(const Napi::CallbackInfo& info);

    Napi::Value getVolume(const Napi::CallbackInfo& info);
    Napi::Value getFrequency(const Napi::CallbackInfo& info);

    Napi::Value setDopplerFactor(const Napi::CallbackInfo& info);

    Napi::Value setMinDistance(const Napi::CallbackInfo& info);
    Napi::Value setMaxDistance(const Napi::CallbackInfo& info);
    Napi::Value setPosition(const Napi::CallbackInfo& info);
    Napi::Value setVelocity(const Napi::CallbackInfo& info);

    Napi::Value setVolume(const Napi::CallbackInfo& info);
    Napi::Value setFrequency(const Napi::CallbackInfo& info);

    Napi::Value getLength(const Napi::CallbackInfo& info);
    Napi::Value getBytes(const Napi::CallbackInfo& info);
};
