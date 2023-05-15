 const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('printApi', {

    handlePrintData: (callback) => ipcRenderer.on('update-print-data', callback),
    printContent: (nextPage) => {
        ipcRenderer.send('readyToPrintContent', nextPage)
      }
  })


