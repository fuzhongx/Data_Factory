<template>
    <el-config-provider :locale="locale" :size="sizes">
  <router-view></router-view>
</el-config-provider>
</template>

<script setup>
import { ref ,computed} from 'vue'
import bus from "@/ulit/Bus.js";
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const lange=ref(zhCn)
const sizes=ref('default')
bus.on("lange", (data) => {
    if(data=='zh'){
      lange.value = zhCn;
    }else{
      lange.value = en;
    }
   
  });
  bus.on("langeSize", (data) => {
    sizes.value=data
    console.log(data);
  });
  const locale = computed(() => ( lange.value.name === 'zh-cn' ? zhCn : en))
</script>
  
<style lang="scss" scoped>
@import url('@/styles/main.scss'); 
html,body{
  width: 100%;
  height: 100%;
}

</style>
