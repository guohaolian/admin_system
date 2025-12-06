<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts" name="Logo">
//引入设置标题与logo这配置文件
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: rgb(115, 148, 236);
  display: flex;
  align-items: center;
  padding: 10px;
  opacity: 0.7;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
