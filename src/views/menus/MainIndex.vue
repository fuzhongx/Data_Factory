<template>
  <div class="header">
    <el-scrollbar>
    <router-view v-slot="{ Component }">
      <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
    <component :is="Component" />
    </transition>
    </router-view>
  </el-scrollbar>
  </div>
</template>

<script setup>

</script>
<style lang="scss" scoped>
.header{
height: 100%;
width: 100%;
max-height: 850px;
}
</style>