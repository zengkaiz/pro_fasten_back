/**
 * dev  : zack
 * desc : 短信列表
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <div class="search">
          <el-input size="mini" v-model="message.listQuery.phone" @keyup.enter.native="getList(true)" placeholder="请输入手机号搜索"></el-input>
          <el-button type="primary" size="mini" @click="getList(true)">搜索</el-button>
        </div>
      </div>
      <tableMode :message="message"></tableMode>
    </div>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import api from '@/apiFetch/api'
export default {
  name: '',
  props: {},
  data() {
    return {
      isShowDialogObj: {},
      storeInfo: null,
      message: {
      // 有无序号
        hasSerialNumber: false,
        // 复选框
        isCheck: false,
        // 操作
        isShow: false,
        border: true,
        // 分页
        pageNeed: false,
        // 标识
        key: 'message',
        // loadding
        listLoading: false,
        // 宽度
        fixedWidth: 100,
        maxHeight: '740',
        showEmpty: true,
        // 配置项
        items: [
          { lable: 'ID', filed: 'id' },
          { lable: '验证码', filed: 'code' },
          { lable: '类型', filed: 'typeName' },
          { lable: '电话号码', filed: 'phone' },
          { lable: '创建时间', filed: 'createtime' }
        ],
        // 得到的数据
        list: [],
        isSlot: true,
        statusText: [],
        // 参数
        listQuery: {},
        // 总条数
        total: null
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.message.getList = () => {
      this.getList()
    }
    this.getList()
  },
  mounted() {},
  methods: {
    // 获取列表信息
    getList(o) {
      this.message.listQuery.limit = `0,1000`
      this.message.listLoading = true
      const query = this.message.listQuery
      api
        .getListVerifyCode(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            var arr
            data.datas.forEach((item) => {
              arr = { ...item.verify }
              this.message.list.push(arr)
            })
            this.message.total = Number(data.totalrows)
          }
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
        .finally(() => {
          this.message.listLoading = false
        })
    }
  },
  filters: {},
  components: {
    tableMode
  }
}
</script>

<style lang="scss" scoped>
.g-home-layout {
  .body-top {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .search {
    .el-input {
      width: 300px;
    }
    /deep/ .el-badge__content.is-fixed {
      top: 0px;
    }
  }
  .btn-area {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .icon {
      font-size: 22px;
      cursor: pointer;
    }
  }
  .body {
    h1 {
      margin-bottom: 15px;
    }
    .add-btn {
      margin: 10px 0;
    }
    .btn-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
      span {
        margin-right: 7px;
      }
    }
  }
}
</style>
