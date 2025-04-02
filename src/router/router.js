import { createRouter, createWebHashHistory } from "vue-router";
import { getRouter } from "@/requert/getRouter/getRouter";
import nprogress from "nprogress";
import cookies from "vue-cookies";
import { ElMessage } from "element-plus";
import staticRoutes from "@/router/index";
// import { useRoute } from "vue-router";
// const routes = new useRoute();

/**
 * 静态路由路由
 */

// const selectRouter=localStorage.getItem('selectKey')
async function fetchDynamicRoutes() {
  try {
    console.log("路由添加调用成功");
    const res = await getRouter();
    const dynamicRoutes = formatRoutes(res.data.data);
    dynamicRoutes.forEach((route) => router.addRoute(route));
 
    // 添加后跳转到首页或其他页面
    if (cookies.get("token")) {
      router.push(localStorage.getItem("selectKey"));
    } else {
      router.push("/");
      ElMessage.error("登录过期,请重新登录:");
    }
  } catch (error) {
    router.push("/");
    ElMessage.error("获取路由失败,请重新登录:", error);
  }
}

/**
 *
 * @param {*} val 后端返回Menu
 * @returns 转化为Router需要的格式
 */
function formatRoutes(val) {
  return val.map((route) => {
    /**
     * com截取首为字母
     */
    let com = route.component.substring(
      route.component.length - 5,
      route.component.length - 4
    );
    /**
     * coms截取倒数第三个字母
     */
    let coms = route.component.substring(
      route.component.length - 3,
      route.component.length - 2
    );

    //截取相应的字符转化大小写
    let comValue = com.toUpperCase();
    let comValues = coms.toUpperCase();
    route.component =
      route.component.substring(0, route.component.length - 5) +
      comValue +
      route.component.substring(
        route.component.length - 4,
        route.component.length - 3
      ) +
      comValues +
      route.component.substring(
        route.component.length - 2,
        route.component.length
      );
    /**
     *  转化成routes格式
     */
    return {
      path: `/${route.path}`,
      name: route.name,
      component: () => import(`@/views/Layout/${route.component}.vue`),
      hidden: route.hidden,
      meta: route.meta,
      children: route.children ? formatRoutes(route.children) : [],
    };
  });
}
    // 在需要的地方调用，如登录成功后
    fetchDynamicRoutes();

const router = createRouter({
  mode: "history",
  history: createWebHashHistory(),
  routes: staticRoutes,
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
});

//路由后置钩子
router.afterEach(() => {
  //路由跳转结束之后 进度条结束
  nprogress.done();
});

export default router;
