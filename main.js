const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const fs = require('fs');
const { loadJsonSync } = require('./electron/file/file');
const registerIpcHandlers = require('./electron/bootstrap/ipcRegistration').Register;

global.Sword = {
  resources: loadJsonSync(path.join(__dirname, "static", "resources.json"))
};
registerIpcHandlers(ipcMain);

app.on("ready", _ => {
// Create the browser window.
  mainWindow = new BrowserWindow({
    width: 860,
    height: 600,
    minWidth: 860,
    minHeight: 600,
    icon: path.join(__dirname, "static", "img", "sword.png")
  })

  // and load the index.html of the app.
  mainWindow.loadURL(path.join("file://", __dirname, 'index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
});

