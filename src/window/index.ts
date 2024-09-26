import {
  BrowserWindow,
  ipcMain
} from 'electron'
import  GDContainerManager  from '../container'
import {
  getPreloadPath,
  getSendEventJS,
  handleOpenWindow,
  startDevToolsIfNeed
} from '../helpers/web'
import { GNBEventBus } from '../helpers/event-bus'
import { eventKey } from '../const'
import { GDTabPageContainer } from '../pages'

export let mainWindow: BrowserWindow

export function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // 无边框窗口
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true
    }
  })

  win.loadURL('http://localhost:9080')

  ipcMain.on('minimize', (event) => {
    win.minimize();
  })

  ipcMain.on('maximize', (event) => {
    win.maximize();
  })

  ipcMain.on('close', (event) => {
    win.close();
  })
  ipcMain.on('insert', (event) => {
    const containers = GDContainerManager.shared.getAllContainer()!
    const activeContainerId = GDTabPageContainer.shared.getActiveTabId()!
    const activeContainer = containers.get(activeContainerId)
    console.log('🚀 ~ ipcMain.on ~ activeContainer:', activeContainer)
    activeContainer.context.webContents.executeJavaScript('document.querySelector(".el-input").querySelector("input").value = 6655'); 
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
