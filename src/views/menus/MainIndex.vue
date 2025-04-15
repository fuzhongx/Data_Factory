<template>
  <div class="header">
    <el-scrollbar>
      <router-view v-slot="{ Component,route  }">
        <transition
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
              mode="out-in">
            <div :key="route"> <!-- 使用 :key 来确保唯一性 -->
              <component :is="Component" />
             </div>
            </transition>
      </router-view>
    </el-scrollbar>
  </div>
</template>

<script setup>
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  max-height: 850px;
}
</style>