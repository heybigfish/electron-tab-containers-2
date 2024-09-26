const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$gnb', {
  $desktop: ({ type, data }) => ipcRenderer.invoke('desktop:service', { type, data }),
  $minimize: () => {
    console.log('minimize---最小化');
    ipcRenderer.send('minimize')
  },  
  $maximize: () => ipcRenderer.send('maximize'),  
  $close: () => ipcRenderer.send('close') 
})
