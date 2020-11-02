/**
 * dev  : zack
 * desc : 产品列表
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <div class="btn-area">
          <el-button type="primary" size="mini" @click="addProduct()" class="add-btn">添加产品</el-button>
        </div>
      </div>
      <tableMode :message="message">
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
        <template slot="operate" slot-scope="prop">
          <div class="btn-icon">
            <el-button type="primary" size="mini" @click="toDetail(prop.scope.row.id)">查看</el-button>
            <el-button type="primary" size="mini" @click="editProduct(prop.scope.row)">编辑</el-button>
          </div>
        </template>
      </tableMode>
    </div>
    <editProductDialog :productInfo="productInfo" :isShowDialog="isShowDialogObj.edit" v-model="isShowDialogObj.edit"></editProductDialog>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import editProductDialog from './components/editProductDialog'
import api from '@/apiFetch/api'
export default {
  name: '',
  props: {},
  data() {
    return {
      isShowDialogObj: {},
      productInfo: null,
      srcList: [],
      id: '',
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
        fixedWidth: 140,
        maxHeight: '740',
        showEmpty: true,
        // 配置项
        items: [
          { lable: 'ID', filed: 'id', width: 70 },
          { lable: '产品名称', filed: 'name' },
          { lable: '产品分类', filed: 'cateID' },
          { lable: '状态', filed: '', scope: 'switch' },
          { lable: '创建人', filed: 'creator' },
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
  methods: {
    // 添加产品
    addProduct() {
      this.productInfo = {
        cateID: this.$route.query.cateID
      }
      this.isShowDialogObj.edit = true
    },
    toDetail(id) {
      this.$router.push({ path: `/productDetail?id=${id}` })
    },
    // 编辑产品
    editProduct(item) {
      this.productInfo = item
      this.isShowDialogObj.edit = true
    },
    // 改变启用状态
    changeStatus(id, status) {
      let formData = new FormData()
      formData.append('id', id)
      formData.append('status', status)
      api
        .saveShow(formData)
        .then((data) => {
          this.getList()
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
    },
    // 获取列表信息
    getList(o) {
      this.message.listQuery.cateID = this.$route.query.cateID
      this.message.listQuery.limit = `0,100`
      this.message.listLoading = true
      const query = this.message.listQuery
      api
        .getShowLists(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            var arr
            data.datas.forEach((item) => {
              item.show.url = []
              item.show.pic.forEach((item1) => {
                item.show.url.push(item1.url)
              })
              arr = { ...item.show }
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
    editProductDialog
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
