<template>
  <div class="contair">
    <div class="header">
      <div class="header-left">
        <!-- <svg-icon icon-name='menu' class="svg-margin-r-20"></svg-icon> -->
        <el-icon
          class="svg-margin-r-20"
          @click="handerCollapsed"
          v-if="isCollapse"
        >
          <Expand />
        </el-icon>
        <el-icon class="svg-margin-r-20" @click="handerCollapsed" v-else>
          <Fold />
        </el-icon>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in nav" :key="item.path">{{
            $t(`${item.meta.title}`)
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header-right">
        <svg-icon :icon-name="data.screenName" @click="toggleFullscreen" class="fullscreen">
          <FullScreen v-if="!isFullscreen" />
          <!-- <exitFullScreen v-else /> -->
        </svg-icon>
        <!-- 布局大小 -->
        <el-dropdown class="m-r-20">
          <span class="el-dropdown-link">
            <svg-icon icon-name="layout-size"></svg-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="changeLayout('default')"
                :disabled="data.layoutSize == 'default' ? true : false"
                ><span class="active">{{
                  $t("tetxSize.default")
                }}</span></el-dropdown-item
              >
              <el-dropdown-item
                @click="changeLayout('large')"
                :disabled="data.layoutSize == 'large' ? true : false"
                ><span class="active">{{
                  $t("tetxSize.large")
                }}</span></el-dropdown-item
              >
              <el-dropdown-item
                @click="changeLayout('small')"
                :disabled="data.layoutSize == 'small' ? true : false"
                ><span class="active">{{
                  $t("tetxSize.small")
                }}</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- lange -->
        <el-dropdown class="m-r-20">
          <span class="el-dropdown-link">
            <svg-icon icon-name="zh"></svg-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="changeLang('zh')"
                :disabled="data.disabled == 'zh' ? true : false"
                ><span class="active">{{
                  $t("lange.Chinese")
                }}</span></el-dropdown-item
              >
              <el-dropdown-item
                @click="changeLang('en')"
                :disabled="data.disabled == 'en' ? true : false"
                divided
                ><span class="active">{{
                  $t("lange.English")
                }}</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 用户 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="@/assets/image/admin.png" alt="" class="imgs-w-h-24" />
            <span class="logo-title">admin</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="account"
                ><span class="active">{{
                  $t("account")
                }}</span></el-dropdown-item
              >
              <el-dropdown-item @click="passion" divided
                ><span class="active">{{
                  $t("personal")
                }}</span></el-dropdown-item
              >
              <el-dropdown-item @click="reset" divided
                ><span class="active">{{
                  $t("logout")
                }}</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import cookie from "vue-cookies";
import bus from "@/ulit/Bus.js";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
// import { FullScreen, exitFullscreen } from "@element-plus/icons-vue";

const stroe = useStore();
const isFullscreen = ref(false);
const { locale } = useI18n();
const data = reactive({
  disabled: "zh",
  layoutSize: "default",
  possions: {
    id: "1",
    name: "个人中心",
    routeName: "PsCenter",
    routePath: "pscenter",
  },
  screenName:'fullscreen',
  account: {
    id: "1",
    name: "用户管理",
    routeName: "User",
    routePath: "user",
  },
});
const internalInstance = getCurrentInstance();
const appContext = internalInstance.ctx;

const route = useRoute();
const router = useRouter();
const isCollapse = ref(false);

onMounted(() => {
  nav;
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    data.screenName='closescreen'
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
    data.screenName='fullscreen'
  }
  isFullscreen.value = !isFullscreen.value;
}
const account = () => {
  stroe.dispatch("ADD_TAGS", data.account);
  bus.emit('selectKey',data.account.routePath)
  router.push("/user");
};
const changeLayout = (item) => {
  data.layoutSize = item;
  bus.emit("langeSize", item);
};

const changeLang = (item) => {
  data.disabled = item;
  locale.value = item;
  bus.emit("lange", appContext.$i18n.locale);
};

const handerCollapsed = () => {
  isCollapse.value = !isCollapse.value;
  bus.emit("eventBus", isCollapse.value);
};
const nav = computed(() => {
  let routes = route.matched;
  return routes;
});

/**
 * 个人中心
 */

const passion = () => {
  // window.location.href = "/pscenter";
  stroe.dispatch("ADD_TAGS", data.possions);
  localStorage.setItem("selectKey", data.possions.routePath);
  router.push("/pscenter");
};

/**
 * 注册登录
 */
const reset = () => {
  cookie.remove("token");
  cookie.remove("refreshToken");
  localStorage.removeItem("selectKey");
  router.push("/");
};
</script>

<style lang="scss" scoped>
.fullscreen {
  margin-right: 10px;
}
.m-r-20 {
  margin-right: 20px;
}
.active {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.svg-margin-r-20 {
  margin-right: 20px;
}

.logo-title {
  padding-left: 10px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.contair {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #f4f4f5;
  .header {
    display: flex;
    justify-content: space-between;
    height: 56px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .header-left {
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 20px;
    }

    .header-right {
      height: 56px;
      padding-right: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-dropdown-link {
        display: flex;
        justify-items: center;
        align-items: center;
        cursor: pointer;
        outline: none;
      }

      :hover {
        background-color: #edeff3;
        border: 1px solid #edeff3;
        outline: none;
      }

      .imgs-w-h-24 {
        width: 24px;
        height: 24px;
      }
    }
  }

  // .contair-tags {
  //   width: 100%;
  //   height: 34px;
  //   background-color: var(--el-bg-color);
  //   border: 1px solid var(--el-border-color-light);
  //   // box-shadow: 0 1px 1px var(--el-box-shadow-light);
  // }
}
</style>