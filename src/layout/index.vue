<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <!-- <div
      class="layout_slider"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    > -->
    <div class="layout_slider">
      <logo></logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件-->
        <el-menu
          :collapse="LayOutSettingStore.fold ? true : false"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          active-text-color="skyblue"
        >
          <!--根据路由动态生成菜单-->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
//获取路由对象
import { useRoute } from 'vue-router'
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'

import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
//获取路由对象
let $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.35s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.35s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.35s;
    background-color: azure;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
