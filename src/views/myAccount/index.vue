/**
 * dev  : zack
 * desc : 我的账户主页面
 */
<template>
  <section class="g-myAccount-layout">
    <div class="myAccount-top">
      <!-- 广告位 -->
      <ad></ad>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的账户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 主体部分 -->
    <div class="myAccount-body">
      <div class="left">
        <h4>我的账户</h4>
        <p @click="changeInfo(index,item)" :class="activeIndex === index ? 'active' :''" v-for="(item, index) in infoList" :key="index">{{item}}</p>
      </div>
      <div class="right">
        <h4 class="rigth-title">{{activeTitle}}</h4>
        <!-- 账户信息 -->
        <account-info v-if="activeIndex===0"></account-info>
        <!-- 预存款项 -->
        <prepaid-money v-if="activeIndex===1"></prepaid-money>
        <!-- 发票信息 -->
        <invoice-info v-if="activeIndex===2"></invoice-info>
        <!-- 密码修改 -->
        <psw-modify v-if="activeIndex===3"></psw-modify>
      </div>
    </div>
  </section>
</template>

<script>
import ad from '@/components/ad'
import accountInfo from './components/accountInfo'
import invoiceInfo from './components/invoiceInfo'
import prepaidMoney from './components/prepaidMoney'
import pswModify from './components/pswModify'
export default {
  name: '',
  props: {},
  data() {
    return {
      infoList: ['账号信息', '预存款项', '发票信息', '密码修改'],
      activeIndex: 0,
      activeTitle: '账号信息'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    changeInfo(index, title) {
      this.activeIndex = index
      this.activeTitle = title
    }
  },
  filters: {},
  components: {
    ad, accountInfo, invoiceInfo, prepaidMoney, pswModify
  }
}
</script>
<style lang="scss">
.el-form-item__content {
  width: 170px;
}
.submit-btn {
  .el-button {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
.g-myAccount-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 130px;
  h4 {
    font-weight: 600;
    font-size: 16px;
  }
  .myAccount-top {
    padding-top: 60px;
    height: 200px;
  }
  .myAccount-body {
    flex: 1;
    display: flex;
    .left {
      width: 130px;
      background: #fff;
      color: #000;
      margin-right: 20px;
      p {
        height: 20px;
        line-height: 20px;
        margin: 2px;
      }
      p:hover {
        background: #e60000;
        color: #fff;
      }
    }
    .right {
      flex: 1;
      background: #fff;
      padding: 15px;
      .rigth-title {
        height: 36px;
        line-height: 36px;
        text-align: left;
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
