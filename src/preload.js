const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  firstName:()=>'Rabbi'
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('xxxx', {
    firstName:()=>'Rabbi',
    ping: () => ipcRenderer.invoke('ping'),
    // we can also expose variables, not just functions
  })