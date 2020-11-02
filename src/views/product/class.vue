/**
 * dev  : zack
 * desc : 产品分类
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <div class="btn-area">
          <el-button type="primary" size="mini" @click="addClass()" class="add-btn">添加分类</el-button>
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
            <span class="el-icon-s-unfold" @click="toProduct(prop.scope.row.id)"></span>
            <span class="el-icon-edit-outline" @click="editClass(prop.scope.row)"></span>
          </div>
        </template>
      </tableMode>
    </div>
    <editClassDialog :classInfo="classInfo" :isShowDialog="isShowDialogObj.edit" v-model="isShowDialogObj.edit"></editClassDialog>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import editClassDialog from './components/editClassDialog'
import api from '@/apiFetch/api'
export default {
  name: '',
  props: {},
  data() {
    return {
      isShowDialogObj: {},
      classInfo: null,
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
          { lable: 'ID', filed: 'id', width: 70 },
          { lable: '分类名称', filed: 'name' },
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
  mounted() {},
  methods: {
    // 添加分类
    addClass() {
      this.classInfo = null
      this.isShowDialogObj.edit = true
    },
    // 编辑分类
    editClass(item) {
      this.classInfo = item
      this.isShowDialogObj.edit = true
    },
    toProduct(id) {
      this.$router.push({ name: 'product', query: { cateID: id } })
    },
    // 改变启用状态
    changeStatus(id, status) {
      let formData = new FormData()
      formData.append('id', id)
      formData.append('status', status)
      api
        .saveCate(formData)
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
        .getListsCate(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            var arr
            data.datas.forEach((item) => {
              arr = { ...item.category }
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
    editClassDialog
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
        margin-right: 10px;
      }
    }
  }
}
</style>
