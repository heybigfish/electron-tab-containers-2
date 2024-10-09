import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router"
import { constRouter } from "./route"

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: constRouter,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
