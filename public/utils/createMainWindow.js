const { BrowserWindow } = require("electron");
const { join } = require("path");
const { autoUpdater } = require("electron-updater");
const config = require("./config");

exports.createMainWindow = async () => {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			devTools: config.isDev,
			contextIsolation: true,
			preload: join(__dirname, "preload.js"),
		},
		frame: true,
		icon: config.icon,
		title: config.appName,
	});

	await window.loadURL(
		config.isDev
			? "http://localhost:3000"
			: `file://${join(__dirname, "..", "../build/index.html")}`,
	);

	window.once("ready-to-show", () => {
		autoUpdater.checkForUpdatesAndNotify();
	});

	window.on("close", (e) => {
		if (!config.isQuiting) {
			e.preventDefault();

			window.hide();
		}
	});

	return window;
};
