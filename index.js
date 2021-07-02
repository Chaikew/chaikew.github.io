const { app, BrowserWindow } = require('electron');

async function createGui() {
    const win = new BrowserWindow({
        width: 550,
        height: 500,
        webPreferences: {
            nodeIntegration: true, // needed to use coffeescript module
            contextIsolation: false,
            webSecurity: true,
            disableBlinkFeatures: 'Auxclick',
            allowRunningInsecureContent: false,
            worldSafeExecuteJavaScript: true
        }
    });

    win.setMenuBarVisibility(false);
    win.loadFile('app/index.html');
}

app.whenReady().then(createGui);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
