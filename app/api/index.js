import request from "../utils/request"
export function apiTest(data) {
  return request({
    url: "/api-portal/article/articleList",
    method: "post",
    data,
    config: {
      realResponse: true,
    },
  })
}
