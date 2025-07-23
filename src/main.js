import { createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import { ElLoading } from 'element-plus';
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/es/locale/lang/zh-cn';
// import router from '@/router/router.js'
import { createPinia } from 'pinia'
import stroe from '@/store/store';
import cookies from 'vue-cookies'
import '@/ulit/svg'
import 'animate.css';
import SvgIcon from './components/svg/SvgIcon.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios';
import 'nprogress/nprogress.css'
import i18n from './lange';
import router from './router/router.js';
import '@/ulit/flexible'
// import { initializeRouter } from '@/router/router';


axios.defaults.headers.common['Content-Type']="application/json;charset=utf-8"


// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
const debounce = (fn, delay) => {
    let timer
     return (...args) => {
       if (timer) {
         clearTimeout(timer)
       }
       timer = setTimeout(() => {
         fn(...args)
       }, delay)
     }
  }
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
   constructor(callback) {
     callback = debounce(callback, 10);
     super(callback);
   }
}
//  const router = await initializeRouter();
const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

const pinia = createPinia()
app.component('svg-icon', SvgIcon)
app.use(i18n)
app.use(cookies)
app.use(stroe)
app.use(pinia)
app.use(router)
// app.use(ElementPlus)
app.use(ElementPlus,{
   locale
})
app.mount('#app')





