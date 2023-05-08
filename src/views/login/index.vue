<template>
  <div class="login-container">
    <div class="content">
      <div class="logo">
        <h1>官网后台管理系统</h1>
      </div>
      <div class="login-main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="账号登录" name="password">
            <el-form ref="form" :model="form" class="edit-form" @keydown.enter.capture="loginIntoSystem">
              <el-form-item>
                <el-input v-model="form.username" placeholder="输入姓名"></el-input>
              </el-form-item>
              <el-form-item style="position: relative">
                <el-input v-model="form.password" :type="isShowPassword ? 'text' : 'password'" placeholder="输入密码"></el-input>
                <View v-if="isShowPassword" class="eye-icon" @click="changeEyeStatus" />
                <Hide v-else :size="14" class="eye-icon" @click="changeEyeStatus" />
              </el-form-item>
            </el-form>
            <el-button type="primary" style="width: 328px" @click="loginIntoSystem">登录</el-button>
          </el-tab-pane>
          <el-tab-pane label="飞书登录" name="feishu">
            <img src="../../assets/feishu.png" class="logo-feishu" alt="lark" />
            <el-button type="primary" style="width: 328px" @click="linkToAuthorization">授权</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="footer">Copyright © 2023 安般前端支持部 Inc. All Rights Reserved.</div>
  </div>
</template>
<script>
import md5 from 'js-md5'
import { warn } from '@/utils/common'
import API from '@/api/index'
import { View, Hide } from '@element-plus/icons-vue'

const activeName = location.href.includes('code') ? 'feishu' : 'password'
const isInLoading = activeName === 'feishu'
export default {
  name: 'Preview',
  components: {
    View,
    Hide
  },
  data() {
    return {
      isShowPassword: false,
      activeName,
      isInLoading,
      form: {
        username: '',
        password: ''
      },
      linkUrl: ''
    }
  },
  mounted() {
    this.getThirdPartUrl()
    if (this.isInLoading) {
      this.loginIntoSystem()
    }
  },
  methods: {
    /**
     * 登录
     */
    async loginIntoSystem() {
      const params = {}
      if (this.activeName === 'password') {
        const { username, password } = this.form
        if (!username || !password) return
        params['username'] = username
        params['password'] = md5(password)
      } else {
        params['code'] = location.href.split('code=')[1].split('&')[0]
        params['platform'] = 'FEISHU_LOGIN'
      }
      try {
        const res = await API.login.login(params)
        if (res) {
          const { userInfo, token } = res.data
          if (userInfo.role === 0) {
            warn('你没有访问权限，请联系【前端支持部门】以获得相应权限', true)
            return
          }
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('token', token)
          this.$store.commit('setUserName', userInfo.name)
          this.$router.push('/news')
        }
      } catch (error) {
        warn(error, true)
      }
    },
    /**
     * 获得飞书认证地址
     */
    async getThirdPartUrl() {
      try {
        const res = await API.login.thirdPartUrl({
          redirectUrl: location.href
        })
        if (res) {
          this.linkUrl = res.data.url
        }
      } catch (error) {
        warn(error, true)
      }
    },
    linkToAuthorization() {
      location.href = this.linkUrl
    },
    changeEyeStatus() {
      this.isShowPassword = !this.isShowPassword
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5;
  background-image: url('../../assets/bg.svg');
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;

  .content {
    flex: 1 1;
    padding: 80px 0 24px;

    .login-main {
      width: 328px;
      margin: 60px auto;
    }

    :deep(.el-tabs__nav) {
      width: 100% !important;
    }

    :deep(.el-tabs__item) {
      width: 50% !important;
    }

    .logo-feishu {
      margin: 19px 0;
      border-radius: 10px;
    }
  }

  .eye-icon {
    position: absolute;
    right: 20px;
    top: 15px;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  .footer {
    position: fixed;
    bottom: 20px;
    left: 50%;
    margin-left: -80px;
    color: rgba(0, 0, 0, 0.35);
    font-size: 14px;
  }
}
</style>
