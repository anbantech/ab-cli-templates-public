<template>
  <div class="page-layout">
    <header-top></header-top>
    <div class="container">
      <side-bar class="left"></side-bar>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import HeaderTop from '/@/common/Layout/HeaderTop.vue'
import SideBar from '/@/common/Layout/SideBar.vue'
</script>
<style lang="stylus" scoped>
.page-layout {
  height: 100vh;
}
.container {
  height: calc(100% - 48px);
  display: flex;
  background: #e9e9e9;
  overflow: hidden;
  .left {
    width: 240px;
  }
  .content {
    flex: 1;
    background: #fff;
    box-sizing: border-box;
  }
}
</style>
