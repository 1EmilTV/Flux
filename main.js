const { app, BaseWindow, WebContentsView, ipcMain } = require('electron');
const path = require('node:path');

let searchView;
let browserView;

const createWindow = () => {
    const win = new BaseWindow({
        width: 1200,
        height: 900,
    })

    searchView = new WebContentsView({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    win.contentView.addChildView(searchView);
    searchView.webContents.loadURL('file://' + __dirname + '/index.html');
    searchView.setBounds({ x: 0, y: 0, width: 1200, height: 100 });

    browserView = new WebContentsView({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    win.contentView.addChildView(browserView);
    browserView.setBounds({ x: 0, y: 100, width: 1200, height: 800 });
};  

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BaseWindow.getAllWindows().length === 0) {
          createWindow()
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
    searchView.webContents.close();
    browserView.webContents.close();
});

ipcMain.on('search', (e, query) => {
    console.log('Loading ' + query);
    browserView.webContents.loadURL(query);
});

console.log('Main running');
console.log('Path: ' + __dirname);
