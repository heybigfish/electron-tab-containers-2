import { app } from 'electron'
import { createWindow } from './window'
import { DesktopService } from './service'

app.whenReady().then(() => {
  DesktopService.shared.init()
  app.commandLine.appendSwitch('ignore-certificate-errors')
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
