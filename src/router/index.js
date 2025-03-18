 export const routes = [
  {
    path: "/",
    component: () => import("@/views/login/LoginIndex.vue"),
    hidden: false,
    meta: {
      icon: "dashboard",
      link: null,
      noCache: false,
      title: "登录页",
    }
  },
  {
    path: "/index",
    component: () => import("@/layout/LayoutIndex.vue"),
    hidden: false,
    meta: {
      icon: "index",
      link: null,
      noCache: false,
      title: "主页",
    },
    children:[]
  }
];
export default routes;
