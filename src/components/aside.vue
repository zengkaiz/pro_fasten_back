/**
 * dev  : zack
 * desc : 系统菜单
 */
<template>
  <section class="g-aside-layout">
    <el-menu
      router
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="selectMenu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="customer">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户中心</span>
      </el-menu-item>
      <el-menu-item index="store">
        <i class="el-icon-s-home"></i>
        <span slot="title">门店管理</span>
      </el-menu-item>
      <el-menu-item index="order">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">订单中心</span>
      </el-menu-item>
      <el-menu-item index="feedback">
        <i class="el-icon-video-camera-solid"></i>
        <span slot="title">评价管理</span>
      </el-menu-item>
      <el-menu-item index="class">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">产品展示</span>
      </el-menu-item>
      <el-menu-item index="services">
        <i class="el-icon-help"></i>
        <span slot="title">售后管理</span>
      </el-menu-item>
      <el-menu-item index="dynamic">
        <i class="el-icon-picture"></i>
        <span slot="title">动态图片管理</span>
      </el-menu-item>
      <el-menu-item index="user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">管理员</span>
      </el-menu-item>
      <el-menu-item index="message">
        <i class="el-icon-mobile"></i>
        <span slot="title">短信列表</span>
      </el-menu-item>
      <el-menu-item index="news">
        <i class="el-icon-video-camera-solid"></i>
        <span slot="title">新闻公告</span>
      </el-menu-item>
      <el-menu-item index="notice">
        <i class="el-icon-bell"></i>
        <span slot="title">下单公告</span>
      </el-menu-item>
    </el-menu>
  </section>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      defaultActive: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    setTimeout(() => {
      this.defaultActive = this.$route.name || 'order'
      console.log(this.defaultActive)
    }, 500)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    selectMenu(index, indexPath) {
      console.log(index)
      console.log(indexPath)
    }
  },
  filters: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.g-aside-layout {
  width: 100%;
  .el-menu {
    height: 100vh;
  }
}
</style>
