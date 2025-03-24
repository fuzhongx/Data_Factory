
import { getRouter } from "@/requert/getRouter/getRouter";
export const fetchDynamicRoutes = async () => {
    try {
      getRouter().then(res=>{
        return  transformRoutes(res.data.data);
      })
      // return transformRoutes(response.data.data);
    } catch (error) {
      console.error('Failed to fetch dynamic routes:', error);
      return []; // 返回空数组或默认路由
    }
  };


// 将后端数据转换为Vue Router需要的格式
/**
 * 
 * @param {*} backendRoutes 后端获取Menu
 * @returns 
 */
const transformRoutes = (backendRoutes) => {
    return backendRoutes.map(route => ({
      path: route.path,                                                         
      name: route.name,
      hidden:route.hidden,
      component: () => import(`@/views/${route.component}.vue`), // 动态导入组件
      meta: { requiresAuth: route.requiresAuth },
      children: route.children ? transformRoutes(route.children) : []
    }));
}
