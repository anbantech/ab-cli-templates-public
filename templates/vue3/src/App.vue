<template>
  <router-view />
</template>
<script>
export default {
  name: 'App',
  mounted() {
    const userInfoString = localStorage.getItem('userInfo') || '{"role": 0, "name": ""}'
    const userInfo = JSON.parse(userInfoString)
    this.$store.commit('setUserName', userInfo.name)
  }
}
</script>
<style lang="stylus">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-select {
  width: 100% !important;
}
.el-upload, .el-upload-dragger {
  width: 100% !important;
}

.w-e-full-screen-container {
  z-index: 99
}
</style>
