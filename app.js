const { app, ipcMain, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/electron-app/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

// ---------------------------------Print Job------------------------------------------

ipcMain.on('process-print', (event, printData) => {
  console.log('processContent: ', printData)
  workerWindow.webContents.send('update-print-data', printData)
})

//Hidden worker window to do print job
workerWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, 'preload_worker.js'), // Path to the preload script
  }
});
workerWindow.loadFile("print.html");
workerWindow.hide(); //make sure this is not commented when going to production
workerWindow.webContents.openDevTools(); //make sure this is commented when going to production

  // print
  ipcMain.on("readyToPrintContent", (event,nextPage) => {
    console.log('Next Page  ==> ',nextPage)
    const options = {
      silent: true,
      margins: {
        marginType: "custom",
        top: 4,
        left: 4,
        right: 4,
        bottom: 4,
      },
    };
    workerWindow.webContents.print(options, (isSuccess, errorType) => {
      if (!isSuccess) {
        console.log(errorType);
        return;
      }
      console.log('print status ==>' ,isSuccess)
    });
  });


//----------------------------------Print Job End -------------------------------------------


}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})


ipcMain.on("sendToMain", (event, path) => {  //test
  //process.chdir(path);
  console.log("execute main.js function()",path)
});





 