<template>
    <div class="common-layout" >
      <el-container>
        <el-aside :width="isCollapse? '64px' : '250px'" id="asides"><Asideindexs></Asideindexs></el-aside>
        <el-container>
          <el-header height="auto">
            <Header/>
            <TabNav/>
          </el-header>
          <el-main><Main></Main></el-main>
        </el-container>
      </el-container>
    </div>
  </template>
<script setup>
import Asideindexs from '@/views/menus/AsideIndex';
import Main from '@/views/menus/MainIndex';
import Header from '@/views/menus/HeaderIndex';
import TabNav from '@/views/menus/TabNav.vue';
// import { ElLoading } from 'element-plus';
import bus from "@/ulit/Bus.js";
import {ref} from 'vue'

const isCollapse=ref()
// let loadingInstance = ElLoading.service({
//   lock: true,
//   text: 'Loading...',
//   background: 'rgba(0, 0, 0, 0.7)'
// });
 
// // 模拟异步操作，1000 毫秒后取消 Loading
// setTimeout(() => {
//     loadingInstance.close();
//   }, 1000);

  /**
   * params {data} aside收缩展开
   */
  bus.on("eventBus", (data) => {
    isCollapse.value = data;
    console.log(data);
    
  });
</script>

<style lang="scss" scoped>
.el-container{
  height: 100vh;
  background-color:#fff;
}
.el-header {
    --el-header-padding:0px !important; 
    --el-header-height: 50px;
    box-sizing: border-box;
    flex-shrink: 0;
    height: var(--el-header-height);
    padding: var(--el-header-padding);
}

.el-main{
  transition: left .3s ease-in-out;
  -webkit-transition: left .3s ease-in-out;
}
.el-aside {
  overflow: auto; /* 保持可滚动 */
  scrollbar-width: none; /* 对于Firefox */
  // transition: width 0.3s;
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}
.el-aside::-webkit-scrollbar {
  display: none; /* 对于Chrome, Safari 和 Opera */
}

</style>
<style>
.el-main{
  padding: 0px !important;
}
.el-menu {
    border-right: 0px;
    box-sizing: border-box;
}
</style>