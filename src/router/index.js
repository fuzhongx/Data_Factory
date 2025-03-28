const staticRoutes  = [
  {
    path: "/",
    component: () => import("@/views/login/LoginIndex.vue"),
    hidden: false,
    meta: {icon: "dashboard", link: null,noCache: false,title: "登录页",
    }
  },
  {
    path: "/index",
    component: () => import("@/layout/LayoutIndex.vue"),
    hidden: false,
    children: [
      {
        path: "/homeindex",
        component: () => import("@/views/menus/HomeIndex.vue"),
        hidden: false,
      },
      {
        component: "@/views/Layout/system/fenpei/InDex",
        meta: { title: "分配用户", icon: "build", noCache: true, link: null },
        name: "userIndex",
        path: "/userIndex",
      }
     
    ],
  }
];
export default staticRoutes;
