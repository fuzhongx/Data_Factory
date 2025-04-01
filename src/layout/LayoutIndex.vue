<template>
    <div class="common-layout" >
      <el-container class="layout-container-demo" id="home">
        <el-aside id="asides"  :width="isCollapse ? '64px' : '500px'"><Asideindexs></Asideindexs></el-aside>
        <el-container>
          <el-header height="auto">
            <Header/>
            <TabNav/>
          </el-header>
          <el-main class="layout-container-demo"> <router-view></router-view></el-main>
        </el-container>
      </el-container>
    </div>
  </template>
<script setup>
import Asideindexs from '@/views/menus/AsideIndex';
import Header from '@/views/menus/HeaderIndex';
import TabNav from '@/views/menus/TabNav.vue';
import { onMounted, ref } from 'vue';
import bus from "@/ulit/Bus.js";

const isCollapse=ref()

onMounted(()=>{
  
})
bus.on("eventBus", (data) => {
    isCollapse.value = data;
    console.log(data,33);
  });

</script>

<style lang="scss" scoped>

.el-header {
    --el-header-padding:0px !important; 
    box-sizing: border-box;
    flex-shrink: 0;
    height: var(--el-header-height);
    padding: var(--el-header-padding);
}
.el-main{
  background: #fff !important;
  --el-main-padding:10px !important;
  padding: 10px !important;
}

.el-aside {
  overflow: auto; /* 保持可滚动 */
  scrollbar-width: none; /* 对于Firefox */
  transition: width 0.3s;
  
}
.el-aside::-webkit-scrollbar {
  display: none; /* 对于Chrome, Safari 和 Opera */
}



</style>