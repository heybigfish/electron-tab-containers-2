const { contextBridge, ipcRenderer } = require('electron')
// 监听 主进程的事件
let data = ''
ipcRenderer.on('getData', (event, arg) => {
  console.log(arg) // prints "ping"
  data = arg
})
const removeListener = (name) => {
  ipcRenderer.removeAllListeners(name)
}
contextBridge.exposeInMainWorld('$cgnb', {
  $queryData: (type='on') => {
    if (type === 'destory') {
      return removeListener('getData')
    }
    return data
  },
  $closeChild: (type='on') => {
    if (type === 'destory') {
      return removeListener('closeChild')
    }
    return ipcRenderer.send('closeChild')
  },
  $selectData: (val, type = 'on') => {
    if (type === 'destory') {
      return removeListener('selectData')
    }
    return ipcRenderer.send('selectData', val)
  },
})
