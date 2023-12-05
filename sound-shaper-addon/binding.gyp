{
    "targets": [{
        "target_name": "sound-shaper-addon",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "sources": [
            "main.cpp",
            "src/MultimediaSubsystem.cpp",
            "src/MultimediaSubsystem.h",
            "src/MultimediaApi.cpp",
            "src/MultimediaApi.h",
        ],
        'include_dirs': [
            "<!@(node -p \"require('node-addon-api').include\")"
        ],
        'libraries': [],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }]
}
