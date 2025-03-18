<template>
  <div class="header">
    <!-- background-color="#304156" -->
    <!-- text-color="#BFCBD9" -->
    <el-menu
      active-text-color="#000"
      background-color="#10469c"
      text-color="#fff"
      class="el-menu-vertical-demo menu-bg"
      id="menu"
      :default-active="data.defaultMenu"
      :default-openeds="data.openKey"
      router
      :collapse="isCollapse"
      @open="handleOpen"
      style="height: 100vh"
      @select="handleMenuSelect"
    >
      <el-menu-item class="bg-title" index="/homeindex">
        <template v-if="isCollapse">
          <img src="@/assets/image/logo.png" class="logo-imgs" />
        </template>
       <template v-else>
        <img src="@/assets/image/logo.png" class="logo-imgs" />
        <!-- <template #title><span class="logo-title">{{$t('title')}}</span></template> -->
       <span class="logo-title">{{$t('title')}}</span>
       </template> 
      </el-menu-item>
      <!-- <el-menu-item index="/homeindex">
        <svg-icon
          icon-name="home"
          class="svg-margin-r-20"
          style="color: #fff"
        ></svg-icon>
        <template #title>{{ $t('home') }}</template></el-menu-item
      > -->
      
      <!-- style="background-color: #304156 !important" -->
      <template v-for="items in data.menuList" :key="items.id">
        <el-menu-item
           v-if="chageMenus(items)"
          :index="items.children[0].path"
          text-color="#fff"
          class="sub-menu-bg is-active menu_hover"
          @click="MenuNav(items.children[0])">
          <svg-icon
              icon-name="home"
              class="svg-margin-r-20"
              style="color: #fff"
            ></svg-icon>
          <template #title>
            <span>{{items.children[0].meta&&items.children[0].meta.title}}</span>
          </template>
        </el-menu-item>

        <el-sub-menu
          v-else
          :index="items.path"
          class="sub-menu-bg is-active"
          style="background-color: #10469c !important"
        >
          <template #title>
            <svg-icon
              icon-name="home"
              class="svg-margin-r-20"
              style="color: #fff"
            ></svg-icon>
            <span>{{items.meta&&items.meta.title}}</span>
          </template>
          <template v-if="items.children">
            <template v-for="childs in items.children" :key="childs">
              <el-menu-item :index="childs.path" @click="MenuNav(childs)">
                <svg-icon
                  icon-name='home'
                  class="svg-margin-r-20"
                  style="color: #fff"
                ></svg-icon>
                {{childs.meta.title}}</el-menu-item
              >
            </template>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
    <div v-loading.fullscreen.lock="data.isLoading"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, onUnmounted } from "vue";
import { getRouter } from "@/requert/getRouter/getRouter";
import bus from "@/ulit/Bus.js";
import {  ElMessage } from "element-plus";
import { useStore } from 'vuex';

const stroe=useStore()
const isCollapse = ref(true);
const data = reactive({
  defaultMenu: localStorage.getItem("selectKey")? localStorage.getItem('selectKey'):[],
  openKey: localStorage.getItem("openKey")? [localStorage.getItem("openKey")]:[],
  menuList: [],
  menus: [],
  isLoading: false,
});

const MenuNav = (val) => {
  bus.emit('tags',val.meta.title)
  stroe.dispatch('ADD_TAGS',val)
};
const chageMenus=(data)=>{
   //不存在子集的情况   
   if(!data.children){return false}
        //  过滤隐藏的子集路由
         const routers=data.children.filter(item=>item.children ? false : true)
         //判断最终结果
         if(routers.length==1){
            return true
         }else{
            return false
         }
}
bus.on('tabValue',tabs=>{
  data.defaultMenu=tabs
})
const handleOpen = (key, keyPath) => {
  data.openKey = [keyPath];
  localStorage.setItem("opentKey", keyPath);
};
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath);
// };
const handleMenuSelect = (index) => {
  // data.defaultMenu = [index];
  localStorage.setItem("selectKey",`${index}`);
};

function handResize() {
  const width = window.innerWidth;
  isCollapse.value=width<=1200
  if (width <= 1200) {
    document.getElementById("menu").style.display = "none";
    isCollapse.value != width <= 1200;
  } else {
    document.getElementById("menu").style.display = "block";
    isCollapse.value = width <= 1200;
  }
}
bus.on('selectKey',(val)=>{
    data.defaultActive=val
  })
onMounted(() => {
  handResize();
  window.addEventListener("resize", handResize);
  bus.on("eventBus", (data) => {
    isCollapse.value = data;
  });
  getRouter()
    .then((res) => {
      console.log(res.data.data, "menu");
      data.menuList = res.data.data;
    })
    .catch((error) => {
      ElMessage.error(error.response.data.msg);
    });
});
onUnmounted(() => {
    window.removeEventListener("resize", handResize);
  });
</script>

<style lang="scss" scoped>
.menu_hover{
  color: #fff !important;
}
.menu_hover:hover{
  background-color: rgb(13, 59, 132) !important;
}
// .menu_hover.is-active{
//   background-color: rgb(13, 59, 132) !important;
// }
.is-active {
  color: #1670b6;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
  height: 100vh;
}
.bg-title {
  width: 100%;
  // background-color: #2b3a4d;
  background-color: #10469c;
  display: flex;
}
.logo-imgs {
  width: 30px;
  height: 30px;
  margin: 0 10px 5px 0px;
}
.logo-title {
  color: #fff;
  font-size: 16px;
}
.svg-margin-r-20 {
  margin-right: 10px;
  // width: 15px;
  color: #4080ff;
}
</style>