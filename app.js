const { app, ipcMain, BrowserWindow } = require('electron')
const fs = require("fs");
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
  ipcMain.on("readyToPrintContent", (event, nextPage) => {
    console.log('Next Page  ==> ', nextPage)
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
      console.log('print status ==>', isSuccess)
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


ipcMain.on("ready-config-file", (event) => {  //test
  console.log('ready config file data')
  fetchConfigData()
});


async function fetchConfigData() {
    const configFilePath = 'config.json';
    if (isFileExist(configFilePath)) {
        const configData = getConfigData(configFilePath)
        mainWindow.webContents.send("congig-data", configData);
    } else {
        const configData = createConfigFileAndReturnDFConfigData(configFilePath)
         mainWindow.webContents.send("congig-data", configData);
    }
}

function isFileExist(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    // File exists
    return true;
  } catch (err) {
    return false;
  }
}


function getConfigData(configFilePath) {
  fs.accessSync(configFilePath, fs.constants.F_OK);
  // File exists

  const configFileContent = fs.readFileSync(configFilePath, 'utf8');
  let configData
  try{
    configData = JSON.parse(configFileContent);
  }catch(err){
      console.log('==================Error ================/n')
      console.error("Please check config file format")
      console.log('==================Error End ================')
  }


  // Use the configData as needed
  console.log('Config file content:', configData);

  return configData;
}


function createConfigFileAndReturnDFConfigData(configFilePath) {
  // File does not exist
  const defaultConfig = { /* Your default configuration data */ };

  try {
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig));
    console.log('Config file created with default data.');
    const configData = getConfigData(configFilePath);

    return configData;


  } catch (err) {
    console.error('Failed to create config file:', err);
  }
}



