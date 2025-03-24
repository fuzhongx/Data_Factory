<template>
    <div class="common-layout" >
      <el-container>
        <el-aside width="200" id="asides"><Asideindexs></Asideindexs></el-aside>
        <el-container>
          <el-header height="auto">
            <Header/>
            <TabNav/>
          </el-header>
          <el-main> <router-view></router-view></el-main>
        </el-container>
      </el-container>
    </div>
  </template>
<script setup>
import Asideindexs from '@/views/menus/AsideIndex';
import Header from '@/views/menus/HeaderIndex';
import TabNav from '@/views/menus/TabNav.vue';
import { ElLoading } from 'element-plus';


let loadingInstance = ElLoading.service({
  lock: true,
  text: 'Loading...',
  background: 'rgba(0, 0, 0, 0.4)'
});
 
// 模拟异步操作，1000 毫秒后取消 Loading
setTimeout(() => {
    loadingInstance.close();
  }, 1000);
</script>

<style lang="scss" scoped>
.el-container{  
  height: 100vh;
  // background-color: var(--el-bg-color-page);
  // background-color: #fff !important;
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
  --el-main-padding:10px !important; 
  padding: var(--el-main-padding);
}
.el-aside {
  overflow: auto; /* 保持可滚动 */
  scrollbar-width: none; /* 对于Firefox */
  
}
.el-aside::-webkit-scrollbar {
  display: none; /* 对于Chrome, Safari 和 Opera */
}



</style>