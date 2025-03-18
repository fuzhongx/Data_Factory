<template>
  <div class="down">
    <!-- <el-tag
      class="mx-1"
      style="color: black; margin-left: 20px"
      @click="tagHome"
      >{{$t('home')}}</el-tag
    > -->
    <el-tag
      v-for="(tag,index ) in tags"
      :key="index"
      :class="activeIndex===tag.meta.title? 'mx-2':'mx-1'"
      v-model="isChecked"
      closable
      :disable-transitions="true"
      @close="handleClose(tag)"
      @click="tagActive(tag)"
    > 
     <span class="tag-yuan"></span>
     {{$t(`${tag.meta.title!=undefined? tag.meta.title:''}`)}}
    </el-tag>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import bus from "@/ulit/Bus.js";
const router = useRouter();
const stroe = useStore();
const isChecked = ref(true);
const activeIndex=ref(0)

// const tagHome = () => {
//   router.push("/homeindex");
// };
bus.on('tags',newValue=>{
  activeIndex.value=newValue
})
const tagActive = (e) => {
  activeIndex.value=e.meta.title
  router.push(e.path);
  isChecked.value=e 
  bus.emit('tabValue',e.path) 
  localStorage.setItem("selectKey",e.path);
};
const tags=computed(() =>stroe.getters.getTabList);

const handleClose = (tag) => {
  if( tags.value.length>1){
    tags.value.splice(tags.value.indexOf(tag), 1);
  }
  tags.value.forEach((e) => {
      router.push(e.path) 
      activeIndex.value=e.meta.title
      console.log(e);
      
  });
//  if(tags.value.length==0){
//   tags.value.push( data.possions)
//   // stroe.dispatch("ADD_TAGS", data.possions);
//   document.getElementsByClassName('mx-1').style.background= '#4080ff'
//  }
 
}; 
</script>

<style scoped>
.tag-yuan{
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border:1px solid #aaa7a7;
  background-color: #fff;
  margin: 2px;
}
.svg-margin-r-20{
  margin-right: 5px;
  padding-top: 4px;
  background-color: #fff;
}
.svg-margin-r-20:hover{
  color: #4080ff;
}
.el-tag.el-tag--primary {
  --el-tag-text-color: rgb(150, 143, 143);
}
.mx-1:hover {
  color: #4080ff;
}
.mx-1 {
  cursor: pointer;
  background: #fff;
  --el-tag-border-radius: 0px;
  margin: 0 3px;
  
}
.mx-2,.el-icon svg {
  color: rgb(255, 253, 253);
  cursor: pointer;
  background: #4080ff;
  --el-tag-border-radius: 0px;
  margin: 0 3px;
}
.down {
  background: #fff;
  z-index: 666;
  height: 35px;
  display: flex;
  align-items: center;
}
</style>
