/**
 * dev  : zack
 * desc : 门店列表
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <!-- <div class="search">
            <el-input size="mini" v-model="message.listQuery.keywords" @keyup.enter.native="getList(true)" placeholder="请输入用户搜索"></el-input>
            <el-button type="primary" size="mini"  @click="getList(true)">搜索</el-button>
        </div>-->
        <div class="btn-area">
          <el-button type="primary" size="mini" @click="addStore()" class="add-btn">添加门店</el-button>
        </div>
      </div>
      <tableMode :message="message">
        <template slot="adminName" slot-scope="prop">
          <div>{{prop.scope.row.admin.nickname}}</div>
        </template>
        <template slot="address" slot-scope="prop">
          <div>{{prop.scope.row.provinceName}} {{prop.scope.row.cityName}} {{prop.scope.row.districeName}} {{prop.scope.row.address}}</div>
        </template>
        <template slot="switch" slot-scope="prop">
          <div>
            <el-switch
              @change="changeStatus(prop.scope.row.id, prop.scope.row.status)"
              v-model="prop.scope.row.status"
              active-value="10"
              inactive-value="44"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </div>
        </template>
        <template slot="creator" slot-scope="prop">
          <div>{{prop.scope.row.creator.nickname}}</div>
        </template>
        <template slot="operate" slot-scope="prop">
          <div class="btn-icon">
            <el-button type="primary" size="mini" @click="editStore(prop.scope.row)">编辑</el-button>
          </div>
        </template>
      </tableMode>
    </div>
    <editStoreDialog :storeInfo="storeInfo" :isShowDialog="isShowDialogObj.edit" v-model="isShowDialogObj.edit"></editStoreDialog>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import editStoreDialog from './components/editStoreDialog'
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
        isShow: true,
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
          { lable: '门店名称', filed: 'name' },
          { lable: '负责人', filed: '', scope: 'adminName' },
          { lable: '门店地址', filed: '', scope: 'address' },
          { lable: '电话号码', filed: 'phone' },
          { lable: '状态', filed: '', scope: 'switch' },
          { lable: '创建人', filed: '', scope: 'creator' },
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
    // 添加用户
    addStore() {
      this.storeInfo = null
      this.isShowDialogObj.edit = true
    },
    // 编辑用户
    editStore(item) {
      this.storeInfo = item
      this.isShowDialogObj.edit = true
    },
    // 改变启用状态
    changeStatus(id, status) {
      let formData = new FormData()
      formData.append('id', id)
      formData.append('status', status)
      api
        .saveStore(formData)
        .then((data) => {
          this.getList()
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
    },
    // 获取列表信息
    getList(o) {
      this.message.listQuery.limit = `0,100`
      this.message.listLoading = true
      const query = this.message.listQuery
      api
        .getStoreLists(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            var arr
            data.datas.forEach((item) => {
              arr = { ...item.store, ...item.city, ...item }
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
    tableMode,
    editStoreDialog
  }
}
</script>

<style lang="scss" scoped>
.g-home-layout {
  .body-top {
    display: flex;
    justify-content: space-between;
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
