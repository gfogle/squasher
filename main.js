const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let _window;

app.on('ready', createWindow);
app.on('window-all-closed', quit);

function activate() {
  if (_window === null) {
    createWindow();
  }
}

function createWindow () {
  _window = new BrowserWindow({width: 800, height: 600});

  _window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  _window.webContents.openDevTools();
  _window.on('closed', () => {
    _window = null;
  });
}

function quit() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}