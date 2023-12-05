const { contextBridge } = require("electron");
const {MultimediaApi} = require("sound-shaper-addon");
const api = new MultimediaApi();
api.create();
contextBridge.exposeInMainWorld("subsystem", {
	stop: () => api.stop(),
	open: (filename) => api.open(filename),
	play: () => api.play(),
	getBytes: () => api.getBytes(),
	getLength: () => api.getLength(),
	getWaveFormat: () => api.getWaveFormat(),
	getVelocity: () => api.getVelocity(),
	getPosition: () => api.getPosition(),
	getDopplerFactor: () => api.getDopplerFactor(),
	getMinDistance: () => api.getMinDistance(),
	getMaxDistance: () => api.getMaxDistance(),
	getVolume: () => api.getVolume(),
	getFrequency: () => api.getFrequency(),
	setVelocity: (x, y, z) => api.setVelocity(x, y, z),
	setPosition: (x, y, z) => api.setPosition(x, y, z),
	setDopplerFactor: (value) => api.setDopplerFactor(value),
	setMinDistance: (value) => api.setMinDistance(value),
	setMaxDistance: (value) => api.setMaxDistance(value),
	setVolume: (value) => api.setVolume(value),
	setFrequency: (value) => api.setFrequency(value),
});
