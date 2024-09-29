import {
  BrowserWindow,
  ipcMain,
  ipcRenderer
} from 'electron'
import GDContainerManager from '../container'
import {
  getPreloadPath,
  getDialogPreloadPath,
  getSendEventJS,
  handleOpenWindow,
  startDevToolsIfNeed
} from '../helpers/web'
import { GNBEventBus } from '../helpers/event-bus'
import { eventKey } from '../const'
import { GDTabPageContainer } from '../pages'
let windows = new Map() // 用于存储窗口和监听器的映射
export let mainWindow: BrowserWindow
export function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // 无边框窗口
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      webSecurity: false //禁用同源策略
    }
  })

  win.loadURL('http://localhost:9080/#/home')
  const { session } = win.webContents
  // 为会话添加请求的监听器
  session.webRequest.onBeforeRequest(
    (details, callback) => {
      // console.log('请求地址:', details.url, '请求类型:', details)
      // 在这里可以做更多的处理，例如修改请求头、取消请求等
      callback({ cancel: false }) // 允许请求继续
    }
  )
  // 为会话添加请求的监听器
  session.webRequest.onCompleted(
    (details) => {
      // console.log('请求完成:', details)
      // 在这里可以做更多的处理，例如修改请求头、取消请求等
    }
  )
  session.webRequest.onHeadersReceived(
    { urls: ['*://*/*'] },
    (d, c) => {
      if (
        d.responseHeaders['X-Frame-Options']
      ) {
        delete d.responseHeaders[
          'X-Frame-Options'
        ]
      } else if (
        d.responseHeaders['x-frame-options']
      ) {
        delete d.responseHeaders[
          'x-frame-options'
        ]
      }

      c({
        cancel: false,
        responseHeaders: d.responseHeaders
      })
    }
  )
  ipcMain.on('minimize', (event) => {
    win.minimize()
  })

  ipcMain.on('maximize', (event) => {
    win.maximize()
  })

  ipcMain.on('close', (event) => {
    win.close()
  })
  ipcMain.on('dialog', (event, { info }) => {
    createDialogWindow(info)
  })
  const handler = (data: any) => {
    win.webContents?.executeJavaScript(
      getSendEventJS(eventKey, data)
    )
  }
  GNBEventBus.shared.subscribe(handler)

  handleOpenWindow(win.webContents)

  startDevToolsIfNeed(win.webContents)

  mainWindow = win
}
function createDialogWindow(info) {
  const childWindow = new BrowserWindow({
    closable: true,
    title: 'childWindow',
    width: 600,
    height: 550,
    parent: mainWindow,
    modal: true,
    autoHideMenuBar: true,
    resizable: true,
    frame: false, // 无边框窗口
    webPreferences: {
      preload: getDialogPreloadPath(),
      nodeIntegration: true //默认是false
    }
  })
  // 为当前窗口创建一个唯一的监听器
  const listenerId = Symbol()
  // 将监听器和窗口关联起来
  windows.set(childWindow, listenerId)
  // 时间戳
  const temp = new Date().getTime()
  childWindow.loadURL(
    'http://localhost:9080/#/common#' + temp,
    {
      postData: info
    }
  )
  const { session } = childWindow.webContents

  childWindow.webContents.send('getData', {
    info
  })

  childWindow.on('close', (event) => {
    const listener = windows.get(childWindow);  
    if (listener) {  
      ipcMain.removeAllListeners('closeChild'); // 注意：这里的移除方式可能需要根据实际情况调整  
      ipcMain.removeAllListeners('selectData'); // 注意：这里的移除方式可能需要根据实际情况调整  
      windows.delete(childWindow);  
    } 
  })
  ipcMain.on('closeChild', (event, type) => {
    childWindow.close()
  })
  ipcMain.on('selectData', (event, data) => {
    console.log(
      '~~~~~~~~~~~~~~~~~~~~~事件接受',
      data
    )
    //  需要将数据传给主容器
    const containers =
      GDContainerManager.shared.getAllContainer()!
    const activeContainerId =
      GDTabPageContainer.shared.getActiveTabId()!
    const activeContainer = containers.get(
      activeContainerId
    )
    const scriptStr = `
  var val = ${data}
  console.log("触发了数据",val); 
  var datas = [
    val.title,
    val.uptime,
    val.source
  ]
  var inputList = document.querySelectorAll('.el-input')
  for (let i = 0; i < inputList.length ; i++) {
    const input = inputList[i]
    const dom = input.querySelector('.el-input__inner')
    console.log('dom.value', dom.value)
    dom.value =  datas[i]
    dom.dispatchEvent(new Event('input'))
  }
  `
    activeContainer.context.webContents.executeJavaScript(
      scriptStr
    )
    childWindow.close()
  })
  startDevToolsIfNeed(
    childWindow.webContents
  )
}
