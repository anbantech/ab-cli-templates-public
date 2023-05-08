<template>
  <div>
    <h1>官网后台</h1>
    <ul>
      <li v-for="(link, linkIndex) in routerList" :key="linkIndex" :class="activeIndex === linkIndex ? 'router-active' : ''">
        <router-link :to="link.path">{{ link.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      routerList: [
        { path: '/board', name: '数据面板' },
        { path: '/news', name: '新闻管理' },
        { path: '/jobs', name: '招聘管理' },
        { path: '/consult', name: '咨询管理' },
        { path: '/config', name: '系统配置' },
        { path: '/logs', name: '系统日志' }
      ],
      activeIndex: 0
    }
  },
  watch: {
    '$route.path': {
      handler() {
        this.initRoute()
      },
      immediate: true
    }
  },
  methods: {
    initRoute() {
      const { path } = this.$route
      for (let i = 0; i < this.routerList.length; i++) {
        if (path.includes(this.routerList[i].path)) {
          this.activeIndex = i
          break
        }
      }
    }
  }
})
</script>

<style scoped lang="stylus">
ul {
  list-style: none;
  padding-left: 0;

  li {
    padding: 20px;
    border-right: 4px solid transparent;

    a {
      color: #333;
      font-weight: 500;
      text-decoration: none;
    }
  }
}

.router-active {
  background: #edf2ff;
  border-right: 4px solid #4880ff;

  a {
    color: #387dff;
    font-weight: 500;
  }
}
</style>
