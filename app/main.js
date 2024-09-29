import { createApp } from 'vue'
import router from "./router"
// 从一个单文件组件中导入根组件
import App from './App.vue'
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount("#app")