const {app, BrowserWindow, Menu} = require("electron");
const isDev = require("electron-is-dev");
const {join} = require("path");

let mainWindow = null;

const createMainWindow = () =>
    new BrowserWindow({
        show:false,
        width: 1920,
        height: 1080,
        minWidth: 800,
        minHeight: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            devTools: isDev,
            contextIsolation: true,
            preload: join(__dirname, "preload.js"),
        },
        frame: true,
        icon: join(__dirname, ".", "/favicon.ico"),
        title: "Sound Shaper",
    });

if (isDev)
    require("electron-reloader")(module);

app.whenReady().then(async () => {
    mainWindow = createMainWindow();
    mainWindow.maximize();
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${join(__dirname, "..", "/build/index.html")}`,
    ).then(() => mainWindow.show());


    if (isDev) {
        // auto-open dev tools
        mainWindow.webContents.openDevTools();

        // add inspect element on right click menu
        mainWindow.webContents.on("context-menu", (e, props) => {
            Menu.buildFromTemplate([
                {
                    label: "Inspect element",
                    click() {
                        mainWindow.inspectElement(props.x, props.y);
                    },
                },
            ]).popup(mainWindow);
        });

    }
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
        mainWindow = createMainWindow();
});
