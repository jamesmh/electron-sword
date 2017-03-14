const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const path = require("path");


app.on("ready", _ => {
// Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(path.join("file://", __dirname, 'index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {

    mainWindow = null
  })
});