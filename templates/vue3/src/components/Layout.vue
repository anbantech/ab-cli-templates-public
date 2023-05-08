<template>
  <el-container>
    <el-aside class="aside" width="200px"><SidebarVue /></el-aside>
    <el-container>
      <el-header class="header"></el-header>
      <el-dropdown class="info-content">
        <div>
          <i class="avatar-icon"></i>
          <span class="user-name">{{ userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SidebarVue from './Sidebar.vue'

export default defineComponent({
  components: {
    SidebarVue
  },
  data() {
    return {
      userInfo: {
        name: '',
        role: 0
      }
    }
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{ "name": "", "role": 0}')
    this.userInfo = userInfo
  },
  methods: {
    logout() {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      window.location.href = '/#/login'
    }
  }
})
</script>

<style lang="stylus" scoped>
.main {
  padding: 20px 64px;
  height: calc(100vh - 60px);
  background: #f6f8fd;
}

.header {
  border-bottom: 1px solid #eaecef;
}

.aside {
  border-right: 1px solid #eaecef;
  height: 100vh;
}

.info-content {
  position: fixed;
  top: 10px;
  right: 20px;
  font-size: 14px;
  cursor: pointer;

  .avatar-icon {
    display: inline-block;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    background: url('../assets/avatar.png') no-repeat;
    background-size: 100% 100%;
  }

  .user-name {
    position: relative;
    top: -10px;
  }
}
</style>
