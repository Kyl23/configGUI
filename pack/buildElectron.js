const fs = require("fs");
const childProcess = require("child_process");
const process = require("process");

const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

const channel = require("../predict/src/utils/channel.json");
const pathConfig = JSON.parse(fs.readFileSync(`${path.dirname(process.execPath)}\\path.json`, 'utf-8'));

let win = null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "icon.png")
  });
  //load the index.html from a url
  win.loadFile(path.join(__dirname, './app/index.html'));
  win.setMenu(null);
  // Open the DevTools.
  //win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on(channel.PASSING_INIT_PROPS, (event, arg) => {
  const jsonFile = fs.readFileSync(
    `${path.dirname(process.execPath)}${pathConfig.configTable}`,
    "utf-8"
  );
  event.reply(channel.PASSING_INIT_PROPS, JSON.parse(jsonFile));
});

ipcMain.on(channel.SENDING_OUTPUT_PARAMS, (event, arg) => {
  fs.writeFileSync(`${path.dirname(process.execPath)}${pathConfig.predictConfig}`, arg, "utf-8");
  childProcess.exec(pathConfig.runPredict, (err, stdout, stderr) => {
    event.reply(channel.SENDING_OUTPUT_PARAMS, stdout);
    shell.openPath(`${path.dirname(process.execPath)}${pathConfig.outPath}`);
  })
});
