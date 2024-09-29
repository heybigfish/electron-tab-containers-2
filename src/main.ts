import { app } from 'electron'
import { createWindow } from './window'
import { DesktopService } from './service'

app.whenReady().then(() => {
  DesktopService.shared.init()
  app.commandLine.appendSwitch('ignore-certificate-errors')
  // 解决iframe跨域问题。
  app.commandLine.appendSwitch("disable-site-isolation-trials");
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
