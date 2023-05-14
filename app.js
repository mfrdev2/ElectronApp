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

ipcMain.on('processContent', (event, printContent) => {
  console.log('processContent: ', printContent)
  workerWindow.webContents.send('update-counter', printContent)
  // workerWindow.webContents.send("printContent", printContent);
})

//Hidden worker window to do print job
workerWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(__dirname, 'preload_worker.js'), // Path to the preload script
  }
});
workerWindow.loadFile("print.html");
//workerWindow.hide(); //make sure this is not commented when going to production
workerWindow.webContents.openDevTools(); //make sure this is commented when going to production

  // when worker window is ready
  ipcMain.on("readyToPrintContent", (event) => {
    // console.log('print')
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
    workerWindow.webContents.print(options, (success, errorType) => {
      if (!success) console.log(errorType);

      console.log(success)
      //load starter page after print done, success or error
      // mainWindow.loadURL(webUrl);
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


ipcMain.on("sendToMain", (event, path) => {
  //process.chdir(path);
  console.log("execute main.js function()",path)
});





 