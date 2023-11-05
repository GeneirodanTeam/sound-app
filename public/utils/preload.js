const {contextBridge} = require('electron');
const {MultimediaApi} = require("../../src/cpp/build/Release/sound-subsystem");
const api = new MultimediaApi()
api.create();
contextBridge.exposeInMainWorld('subsystem', 
    {
        open: (filename) => api.open(filename),
        play: () => api.play(),
    }
)