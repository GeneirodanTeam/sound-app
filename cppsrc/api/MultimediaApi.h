#pragma once
#include <napi.h>
#include "../src/MultimediaSubsystem.h"

class ClassExample final : public Napi::ObjectWrap<ClassExample>
{
public:
    static Napi::Object init(Napi::Env env, Napi::Object exports); //Init function for setting the export key to JS
    explicit ClassExample(const Napi::CallbackInfo& info); //Constructor to initialise

private:
    static Napi::FunctionReference
    _constructor; //reference to store the class definition that needs to be exported to JS
    void open(const Napi::CallbackInfo& info);
    MultimediaSubsystem* _actualClass; //internal instance of actualclass used to perform actual operations.
};
