/**
 * dev  : Mopecat
 * desc : 登录页
 */
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="userName">
        <span class="iconfont el-icon-user"></span>
        <el-input ref="userName" v-model="loginForm.userName" placeholder="用户名" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="iconfont el-icon-lock"></span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        password: [{ validator: validatePassword, trigger: 'blur' }],
        userName: [{ required: true, trigger: 'blur', message: '请输入昵称' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    loginRequest() {
      const { userName, password } = this.loginForm
      this.$store
        .dispatch('init', { userName, password })
        .then(() => {
          // this.$router.push({ path: '/' })
          let routeData = this.$router.resolve({ name: 'order' })
          window.open(routeData.href, '_self')
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
    },
    // 登录跳转
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginRequest()
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #2d3a4b;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .title-container {
    line-height: 40px;
    color: #fff;
    text-align: center;
    font-size: 26px;
    margin: 20px;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 240px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .iconfont {
    width: 20px;
    color: #ffffff;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
