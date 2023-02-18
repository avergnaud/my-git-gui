const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');
const executeGit = require('./git_util.js')

app.disableHardwareAcceleration()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    }
  });
  ipcMain.handle('ping', () => 'pong')
  ipcMain.on('git', (event,command) => executeGit(command))
  
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  // (macOS) Activating the app when no windows are available should open a new one
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
