import { ElMessage } from "element-plus"

const errorCodes = {}
export const sendErrorMsg = (resp) => {
  const errKey = JSON.stringify(resp)
  if (`${errKey}` in errorCodes) return
  errorCodes[errKey] = true
  ElMessage({
    type: "error",
    message: resp.message,
    duration: 1500,
    onClose: () => {
      delete errorCodes[errKey]
    },
  })
}
