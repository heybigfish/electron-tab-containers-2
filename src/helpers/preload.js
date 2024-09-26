const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$gnb', {
  $desktop: ({ type, data }) => ipcRenderer.invoke('desktop:service', { type, data }),
  $minimize: () => {
    ipcRenderer.send('minimize')
  },  
  $maximize: () => ipcRenderer.send('maximize'),  
  $close: () => ipcRenderer.send('close'), 
  $insert: () => ipcRenderer.send('insert') 
})
