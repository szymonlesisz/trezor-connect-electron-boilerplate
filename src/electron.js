const { app, session, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let connectWindow, mainWindow;

// create window after app is ready
function createWindow() {

    // create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 775,
        //frame: false,
        //resizable: false,
        webPreferences: {
            nodeIntegration: true, // dev settings to be able to use "require" in main.js, could be set to false in production build
            nativeWindowOpen: true, // need to be set in order to display modal
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));
    // mainWindow.webContents.openDevTools()

    // filter all requests to bridge and change origin to make it work
    const filter = {
        urls: ['http://127.0.0.1:21325/*']
    };
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        details.requestHeaders['Origin'] = 'https://electron.trezor.io';
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });

    // in order to use modal mainWindow.webPreferences.nativeWindowOpen should be set to true
    mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
        if (frameName === 'modal') {
          // open window as modal
          event.preventDefault()
          Object.assign(options, {
            modal: true,
            parent: mainWindow,
            width: 780,
            height: 620,
            center: true,
            closable: true, // doesn't work?, im not sure how to close this modal yet, should i render "close" button inside popup.html?
          })
          event.newGuest = new BrowserWindow(options);
          // event.newGuest.webContents.openDevTools({mode:'undocked'})
        }
    })

    // emitted when the window is closed.
    mainWindow.on('closed', () => {
        app.quit();

        mainWindow = null;
        connectWindow = null;
    });
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
})