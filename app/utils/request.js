
import axios from "axios"

const service = axios.create({
  baseURL: 'https://www.cfbrain.com.cn/',
  timeout: 5000,
})

// 注册需要返回真实resp的请求
const registerRequest = []
// 请求拦截器
service.interceptors.request.use((config) => {
  if (config.realResponse) {
    const request = JSON.stringify({
      url: config.url,
      method: config.method,
      data: config.data,
    })
    registerRequest.push(request)
  }
  return config
})

// 必须先拦截一下
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 这里处理后端返回数据,需要根据实际情况做处理
    if (response.data.code !== "000000") {
      // message("error", response.data.message)
      return
    }
    if (registerRequest.length > 0) {
      const request = JSON.stringify({
        url: response.config.url,
        method: response.config.method,
        data: JSON.parse(response.config.data),
      })
      const index = registerRequest.indexOf(request)
      if (index > -1) {
        // 删除对应数据
        registerRequest.splice(index, 1)
        return response
      }
    }
    return response.data
  },
  (err) => {
    alert("网络问题")
    return Promise.reject(new Error(err))
  },
)

const request = (params) => {
  return service.request({
    url: params.url,
    method: params.method || "get",
    [params.method.toLowerCase() === "get" ? "params" : "data"]: params.data,
    ...params.config,
  })
}
export default request
