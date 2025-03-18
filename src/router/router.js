import { createRouter, createWebHashHistory } from "vue-router";
import { getRouter } from "@/requert/getRouter/getRouter";
import nprogress from "nprogress";
import cookies from "vue-cookies";
import { ElMessage } from "element-plus";

const staticRoutes  = [
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
    children: [
      {
        path: "/homeindex",
        component: () => import("@/views/menus/HomeIndex.vue"),
        hidden: false,
        meta: {
          icon: "dashboard",
          link: null,
          noCache: false,
          title: "首页",
        },
      },
    ],
  },
];
// const selectRouter=localStorage.getItem('selectKey')
async function fetchDynamicRoutes() {
  try {
    const res=await getRouter()
    console.log(res.data.data,666);
    formatRoutes(res.data.data)
    console.log(formatRoutes(res.data.data),22);
    const dynamicRoutes = formatRoutes(res.data.data)
    dynamicRoutes.forEach(route => router.addRoute(route))
   
    // 添加后跳转到首页或其他页面
    router.push('/')
  } catch (error) {
    console.error('获取路由失败:', error)
  }
}
function formatRoutes(val){
 return val.map((route) => {
    let com=route.component.substring(route.component.length-5,route.component.length-4)
    let coms=route.component.substring(route.component.length-3,route.component.length-2)
    let comValue=com.toUpperCase()
    let comValues=coms.toUpperCase()
    route.component=route.component.substring(0,route.component.length-5)+comValue
    +route.component.substring(route.component.length-4,route.component.length-3)
    +comValues+route.component.substring(route.component.length-2,route.component.length)
    return {
        path: `/${route.path}`,
        name: route.name,
        component: () => import(`@/views/Layout/${route.component}.vue`),
        hidden: route.hidden,
        meta: route.meta,
        children: route.children ? formatRoutes(route.children) : [],

      }
   
  });

}
// 在需要的地方调用，如登录成功后
fetchDynamicRoutes()

const router = createRouter({
  mode: "history",
  history: createWebHashHistory(),
  routes:staticRoutes,
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  if (to.path === "/") {
    next();
  } else {
    const token = cookies.get("token");
    if (token) {
      next();
    } else {
      // token过期
      ElMessage.error("会话过期，请重新登录");
      cookies.remove("token");
      next("/");
    }
  }
});
//路由后置钩子
router.afterEach(() => {
  //路由跳转结束之后 进度条结束
  nprogress.done();
});
export default router;
