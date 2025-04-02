const staticRoutes  = [
  {
    path: "/",
    redirect:'/index',
    component: () => import("@/views/login/LoginIndex.vue"),
    hidden: false,
    meta: {icon: "dashboard", link: null,noCache: false,title: "登录页",
    }
  },
  {
    path: "/index",
    component: () => import("@/views/Layout/LAyOut.vue"),
    hidden: false,
    children: [
      {
        path: "/userIndex",
        name: "userIndex",
        component:()=>import("@/views/Layout/system/fenpei/InDex.vue"),
        meta: { title: "分配用户", icon: "build", noCache: true, link: null },
       
      }
     
    ],
  }
];
export default staticRoutes;
