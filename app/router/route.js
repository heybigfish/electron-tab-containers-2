

/***
 * @常量路由
 */
export const constRouter = [
  {
    path: "/home",
    meta: { title: "首页", icon: "", isShow: false },
    component: () => import("@/views/home.vue"),
  },
  {
    path: "/common",
    meta: { title: "通用", icon: "", isShow: false },
    component: () => import("@/views/common.vue"),
  },
]
