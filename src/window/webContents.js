import { apiTest } from '../../app/api/index'
const https = require('https'); 
/**
 * 可以获取到发送请求是的数据
 *  request
 * Network.requestWillBeSent
 * 可以获取到收到的响应数据-不含响应内容（可进一步获取响应内容）
 *  response
 * Network.responseReceived
 */

/**
 *
 * 用于webContents.debugger中
 * 监听网页中http请求，获取请求和响应数据
 * @param webWindow  当前窗体实例
 * @param id 窗体实例ID，用于在渲染线程显示数据
 */
export function getHttpDataLocal (webWindow) {
  try {
    webWindow.webContents.debugger.attach('1.1');
  } catch (err) {
    console.log('调试器连接失败: ', err)
  }
  webWindow.webContents.debugger.on('detach', (event, reason) => {
    console.log('调试器由于以下原因而分离 : ', reason)
  });
  webWindow.webContents.debugger.on('message', (event, method, params) => {
    //params中无响应数据只有响应头

    if (method === 'Network.requestWillBeSent') {
      // console.log("GetHttpData", { type: 'req', url: params.request.url }, params);
    }

    if (method === 'Network.responseReceived') {
      var mimeType = params.response.mimeType;
      if (mimeType == 'application/json') {
        webWindow.webContents.debugger.sendCommand('Network.getResponseBody', { requestId: params.requestId }).then(function (response) {
          if (params.response.url.indexOf('/sys-api/v1.0/auth/enterprise/quick/factorAccountLogin') !== -1) {
            console.log('🚀 国税接口完成:', { type: 'repBody', url: params.response.url }, JSON.parse(response.body))
            apiTest({
              pageNum: 1,
              pageSize: 10
            }).then((res) => {
              console.log('🚀 国税接口完成后，调用咱们系统接口，进行数据回传：', res);
            }).catch((err) => {
              console.log('🚀 ~ ~~~~~~~~~~~~---err:', err);
            })
          }
        });
      }
    }
  })
  webWindow.webContents.debugger.sendCommand('Network.enable');
}

