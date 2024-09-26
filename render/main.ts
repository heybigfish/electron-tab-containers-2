import { Tab, TabGroup } from './tabs'
import './tabs'
import { GNBEventManager } from './utils/event-manager'
import {
  closeTabOnTabPage,
  createTabOnWindow,
  frameDidReadyOnTabPage,
  onCloseTab,
  onCreateTab,
  onSwitchTab,
  onTabTitle,
  switchTabOnWindow
} from './utils/gnb.desktop'
import path from 'path'

GNBEventManager.shared.register()

const tabGroup: TabGroup =
  document.querySelector('.tab-group')!
tabGroup.on('ready', () =>
  console.info('TabGroup is ready')
)

const onCreate = (tabGroup: any) => {
  onCreateTab(this, (id) => {
    let tab = tabGroup.tabs.find(
      (item: { containerId: number }) =>
        item.containerId == id
    )
    if (!tab) {
      tab = tabGroup.addTab({
        containerId: id,
        closable: true
      })
      tab.on(
        'closing',
        (_: any, __: any) => {
          closeTabOnTabPage(tab.containerId)
        }
      )
    }
    tab.activate()
  })
}

const onClose = (tabGroup: any) => {
  onCloseTab(this, (id) => {
    let tab = tabGroup.tabs.find(
      (item: { containerId: number }) =>
        item.containerId == id
    )
    if (tab) {
      tab.close(true, false)
    }
  })
}

const onSwitch = (tabGroup: any) => {
  onSwitchTab(this, (id) => {
    // 监听到需要切换标签
    let tab = tabGroup.tabs.find(
      (item: { containerId: number }) =>
        item.containerId == id
    )
    if (tab && !tab.isActivated) {
      tab.activate()
    }
  })
}

const onTabContentChange = (
  tabGroup: any
) => {
  onTabTitle(this, (id, title) => {
    let tab: Tab = tabGroup.tabs.find(
      (item) => item.containerId == id
    )
    if (tab && title.length > 0) {
      tab.setTitle(title)
    }
  })
}

onCreate(tabGroup)
onSwitch(tabGroup)
onClose(tabGroup)
onTabContentChange(tabGroup)
frameDidReadyOnTabPage()

tabGroup.on('tab-active', (tab: Tab) => {
  // 用户主动切换标签
  tab.containerId &&
    switchTabOnWindow(tab.containerId)
})

tabGroup.on('click-add-button', () => {
  try {
    // const fileBasePath = "../src/pages/"
    // const filePath = 'file://' + fileBasePath + '/demo.html'
    // createTabOnWindow(filePath, 'file') 
    createTabOnWindow('https://etax.ningbo.chinatax.gov.cn:8443/')
  } catch (error) {
    console.log('🚀 ~ tabGroup.on ~ error:', error)
  }
})

createTabOnWindow('https://etax.ningbo.chinatax.gov.cn:8443/')

// createTabOnWindow('https://www.gaoding.com')

// const fileBasePath = "../src/pages/"
// const filePath = 'file://' + fileBasePath + '/demo.html'
// createTabOnWindow(filePath, 'file') 