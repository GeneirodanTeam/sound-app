const { join } = require("path");
const isDev = require("electron-is-dev");

let config = {
	appName: "Sound Shaper",
	icon: join(__dirname, "..", "/favicon.ico"),
	tray: null,
	isQuiting: false,
	mainWindow: null,
	popupWindow: null,
	isDev: false,
};

module.exports = config;
