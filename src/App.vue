<template>
  <div id="app">
    <el-container v-if="!isLoginPage">
      <el-header>
        <pro-header></pro-header>
      </el-header>
      <el-container>
        <el-aside class="aside" style="width:240px;">
          <proAside></proAside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer class="footer"></el-footer>
        </el-container>
      </el-container>
    </el-container>
    <el-container v-else>
      <router-view />
    </el-container>
  </div>
</template>

<script>
import proHeader from '@/components/header'
import proAside from '@/components/aside'
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  created() {
    console.log(window.location)
  },
  methods: {
  },
  computed: {
    ...mapState(['isLoginPage'])
  },
  components: {
    proHeader,
    proAside
  }
}
</script>

<style lang="scss">
@import './assets/css/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .aside {
    height: 100vh;
    background: #2c3e50;
  }
  .el-container {
    width: 100%;
    overflow: hidden;
  }
  .el-main {
    background: #ffffff;
  }
}
</style>
