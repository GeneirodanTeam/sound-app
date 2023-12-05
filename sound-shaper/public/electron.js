const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const { autoUpdater } = require("electron-updater");
const { createMainWindow } = require("./utils/createMainWindow");
const AutoLaunch = require("auto-launch");
const config = require("./utils/config");

if (!config.isDev) {
	const autoStart = new AutoLaunch({
		name: config.appName,
	});
	autoStart.enable();
} else require("electron-reloader")(module);

app.on("ready", async () => {
	config.mainWindow = await createMainWindow();
	if (config.isDev) {
		// auto-open dev tools
		config.mainWindow.webContents.openDevTools();

		// add inspect element on right click menu
		config.mainWindow.webContents.on("context-menu", (e, props) => {
			Menu.buildFromTemplate([
				{
					label: "Inspect element",
					click() {
						config.mainWindow.inspectElement(props.x, props.y);
					},
				},
			]).popup(config.mainWindow);
		});
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0)
		config.mainWindow = createMainWindow();
});

ipcMain.on("app_version", (event) => {
	event.sender.send("app_version", { version: app.getVersion() });
});

autoUpdater.on("update-available", () => {
	config.mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
	config.mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
	autoUpdater.quitAndInstall();
});
