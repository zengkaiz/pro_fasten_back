/**
 * dev  : zengkaiz
 * desc : 用户列表
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <div class="search">
            <el-input size="mini" v-model="message.listQuery.phone" @keyup.enter.native="getList(true)" placeholder="请输入用户电话搜索"></el-input>
            <el-button type="primary" size="mini"  @click="getList(true)">搜索</el-button>
        </div>
      </div>
      <tableMode :message="message">
        <template slot="operate" slot-scope="prop">
          <div class="btn-icon">
            <el-button type="primary" size="mini" @click="editUser(prop.scope.row)">编辑</el-button>
          </div>
        </template>
      </tableMode>
    </div>
    <editUserDialog :userInfo="userInfo" :isShowDialog="isShowDialogObj.edit" v-model="isShowDialogObj.edit"></editUserDialog>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import editUserDialog from './components/editUserDialog'
import api from '@/apiFetch/api'
export default {
  name: '',
  props: {},
  data() {
    return {
      isShowDialogObj: {},
      userInfo: null,
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
          { lable: '用户账号', filed: 'userName' },
          { lable: '用户昵称', filed: 'nickName' },
          { lable: '电话号码', filed: 'phone' }
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
    // 添加用户
    addUser() {
      this.userInfo = null
      this.isShowDialogObj.edit = true
    },
    // 编辑用户
    editUser(item) {
      this.userInfo = item
      this.isShowDialogObj.edit = true
    },
    // 获取列表信息
    getList(o) {
      this.message.listQuery.limit = `0,1000`
      this.message.listLoading = true
      const query = this.message.listQuery
      api
        .getCustLists(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            data.datas.forEach((item) => {
              this.message.list.push(item.cust)
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
    tableMode,
    editUserDialog
  }
}
</script>

<style lang="scss" scoped>
.g-home-layout {
  .body-top{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
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
