/**
 * dev  : zack
 * desc : 头部
 */
<template>
  <section class="g-header-layout">
    <el-container>
      <el-header>
        <div class="header-title-wrap">
          <div class="header-title" @click="toIndex">图文中国.com</div>
        </div>
        <div class="user" v-if="username">
          <el-dropdown @command="logout" trigger="click">
            <div class="info">
              <div>
                <i class="el-icon-s-custom"></i>
                {{username}}
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
    </el-container>
  </section>
</template>

<script>
import api from '../apiFetch/api'
import { mapState } from 'vuex'
export default {
  name: 'biheader',
  data() {
    return {}
  },
  computed: {
    ...mapState(['']),
    username() {
      return this.$store.state.username
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 回到首页
    toIndex() {
      this.$router.push({ name: 'home' })
    },
    logout() {
      api
        .logout()
        .then(() => {
          this.$message.success('登出成功')
          this.$router.push('/login')
        })
        .catch((err) => {
          this.$message.error(err.errorMsg)
        })
    }
  },
  filters: {},
  components: {}
}
</script>

<style lang="scss" scoped>
@import '~@assets/css/common.scss';
.g-header-layout {
  .el-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    color: #fff;
    background: $menu-bg-color;
    display: flex;
    // justify-content: center;
    align-items: center;
    .header-title-wrap {
      text-align: center;
    }
    .header-title {
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
    }
    .user {
      .el-icon-document {
        font-size: 20px;
        font-weight: 700;
      }
      font-size: 18px;
      margin-left: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .info {
        margin-left: 40px;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
}
</style>
