<template>
  <div class="down">
    <!-- <el-tag
      class="mx-1"
      style="color: black; margin-left: 20px"
      @click="tagHome"
      >{{$t('home')}}</el-tag
    > -->
    <el-tag v-for="(tag, index) in tags" :key="index" :class="activeIndex === tag.meta.title ? 'mx-2' : 'mx-1'"
      v-model="isChecked" closable :disable-transitions="true" @close="handleClose(tag)" @click="tagActive(tag)">
      <span :class="activeIndex === tag.meta.title? 'tag-yuans': 'tag-yuan'"></span>
      {{ $t(`${tag.meta.title != undefined ? tag.meta.title : ''}`) }}
    </el-tag>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import bus from "@/ulit/Bus.js";
const router = useRouter();
const stroe = useStore();
const isChecked = ref(true);
const activeIndex = ref('')

onMounted(()=>{

})

bus.on('tags', newValue => {
  activeIndex.value = newValue
})

const tagActive = (e) => {
  activeIndex.value = e.meta.title
  router.push(e.path);
  isChecked.value = e
  bus.emit('tabValue', e.path)
  localStorage.setItem("selectKey", e.path);
};

const tags = computed(() => stroe.getters.getTabList)

const handleClose = (tag) => {
  if (tags.value.length > 1) {
    tags.value.splice(tags.value.indexOf(tag), 1);
  }
  tags.value.forEach((e) => {
    router.push(e.path)
    activeIndex.value = e.meta.title
  });

}; 
</script>

<style lang="scss" scoped>

.tag-yuans {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ffffff;
  margin-bottom: 1px;
}

.tag-yuan {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #4080ff;
  border: 1px solid #f1ebeb;
  margin-bottom: 1px;
}

.svg-margin-r-20 {
  margin-right: 5px;
  padding-top: 4px;
  background-color: #fff;
}

.svg-margin-r-20:hover {
  color: #4080ff;
}

.el-tag.el-tag--primary {
  --el-tag-text-color: rgb(17, 17, 17);
}

.mx-1:hover {
  color: #4080ff;
}

.mx-1 {
  cursor: pointer;
  background: #fff;
  --el-tag-border-radius: 0px;
  margin: 0 3px;
  padding: 14px 10px;
  border-radius: 8px;
}


.mx-2,
.el-icon svg {
  color: rgb(255, 253, 253);
  cursor: pointer;
  background: #4080ff;
  --el-tag-border-radius: 3px;
  margin: 0 3px;
  padding: 14px 10px;
  border-radius: 8px;
}

.down {
  background: #fff;
  z-index: 666;
  display: flex;
  align-items: center;
  height: 35px;
  width: 100%;
  /* background: var(--base-tag-background); */
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0;
  box-shadow: 0 1px 3px 0 ;
  padding-left: 15px;
}

</style>

<style >
.el-tag .el-tag__close:hover {
    background-color: #fff !important;
    color:#4080ff !important;
}
.el-tag .el-tag__close{
  color: #e9e0e0;
}
</style>
