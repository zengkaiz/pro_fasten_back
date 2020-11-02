/**
 * dev  : zack
 * desc : 动态图片列表
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <div class="btn-area">
          <el-button type="primary" size="mini" @click="addProduct()" class="add-btn">添加图片</el-button>
        </div>
      </div>
      <tableMode :message="message">
        <template slot="sort" slot-scope="prop">
          <el-input type="number" v-model="prop.scope.row.sort" @change="saveSort(prop.scope.row.id, prop.scope.row.sort)"></el-input>
        </template>
        <template slot="pic" slot-scope="prop">
          <div>
            <span class="enclosure" v-for="item in prop.scope.row.pic" :key="item.id">
              <el-image fit="fill" :src="item.url" :preview-src-list="prop.scope.row.url"></el-image>
            </span>
          </div>
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
        <template slot="operate" slot-scope="prop">
          <div class="btn-icon">
            <el-button type="primary" size="mini" @click="editProduct(prop.scope.row)">编辑</el-button>
          </div>
        </template>
      </tableMode>
    </div>
    <editDynamicDialog :info="dynamicInfo" :isShowDialog="isShowDialogObj.edit" v-model="isShowDialogObj.edit"></editDynamicDialog>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import editDynamicDialog from './components/editDynamicDialog'
import api from '@/apiFetch/api'

export default {
  name: '',
  props: {},
  data() {
    return {
      isShowDialogObj: {},
      dynamicInfo: null,
      srcList: [],
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
          { lable: '图片权重', filed: '', scope: 'sort' },
          { lable: '图片类别', filed: 'typeName' },
          { lable: '产品图片', filed: '', scope: 'pic' },
          { lable: '尺寸', filed: 'size' },
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
  watch: {},
  created() {
    this.message.getList = () => {
      this.getList()
    }
    this.getList()
  },
  mounted() {},
  methods: {
    // 添加产品
    addProduct() {
      this.dynamicInfo = null
      this.isShowDialogObj.edit = true
    },
    // 编辑产品
    editProduct(item) {
      this.dynamicInfo = item
      this.isShowDialogObj.edit = true
    },
    saveSort(id, sort) {
      let formData = new FormData()
      formData.append('id', id)
      formData.append('sort', sort)
      api
        .sortDynamicLists(formData)
        .then((data) => {
          this.getList()
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
    },
    // 改变启用状态
    changeStatus(id, status) {
      let formData = new FormData()
      formData.append('id', id)
      formData.append('status', status)
      api
        .saveDynamic(formData)
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
        .getDynamicLists(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            var arr
            data.datas.forEach((item) => {
              item.dynamic.url = []
              item.dynamic.pic.forEach((item1) => {
                item.dynamic.url.push(item1.url)
              })
              arr = { ...item.dynamic }
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
    editDynamicDialog
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
