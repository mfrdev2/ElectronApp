// const { contextBridge, ipcRenderer } = require('electron')

// // window.addEventListener("DOMContentLoaded", () => {

// //     ipcRenderer.on("printContent", (event, content) => {
// //         // document.body.innerHTML = content;
// //         console.log(content);
// //         setDataInView(content);
// //     });

// // });



// contextBridge.exposeInMainWorld('print', {

//     handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
//     printContent: (content) => {
//         console.log(content)
//         ipcRenderer.send('readyToPrintContent', content)
//       },
//     // printContent: (content) => {
      
//     //   setDataInView(content);
//     // },
//     // we can also expose variables, not just functions
//   })


