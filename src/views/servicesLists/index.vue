/**
 * dev  : zack
 * desc : 售后处理
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <div class="search">
          <b>订单id：</b>
          <el-input size="mini" v-model="message.listQuery.orderID" @keyup.enter.native="getList(true)"></el-input>
          <b class="search-item">售后原因：</b>
          <el-select v-model="message.listQuery.status" placeholder="请选择" size="mini">
            <el-option v-for="(key, value) in confLists.afterServiceStatus" :key="value" :label="key" :value="value"></el-option>
          </el-select>
          <el-button class="search-btn" type="primary" size="mini" @click="getList(true)">搜索</el-button>
        </div>
      </div>
      <tableMode :message="message">
        <template slot="operate" slot-scope="prop">
          <div class="btn-icon">
            <el-button type="primary" size="mini" @click="toServiceDetail(prop.scope.row.id)">查看</el-button>
            <el-button type="primary" :disabled="prop.scope.row.status !== '10'" size="mini" @click="handleOrder(prop.scope.row.id)">处理</el-button>
          </div>
        </template>
      </tableMode>
    </div>
    <!-- 处理 -->
    <handleOrderDialog :id="orderId" :isShowDialog="isShowDialogObj.handle" v-model="isShowDialogObj.handle"></handleOrderDialog>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import handleOrderDialog from './components/handleOrderDialog'
import api from '@/apiFetch/api'
import { mapState } from 'vuex'
export default {
  name: '',
  props: {},
  data() {
    return {
      isShowDialogObj: {},
      orderId: '',
      message: {
      // 有无序号
        hasSerialNumber: false,
        // 复选框
        isCheck: false,
        // 操作
        isShow: true,
        border: true,
        // 分页
        pageNeed: true,
        // 标识
        key: 'message',
        // loadding
        listLoading: false,
        // 宽度
        fixedWidth: 200,
        maxHeight: '740',
        showEmpty: true,
        // 配置项
        items: [
          { lable: '售后ID', filed: 'id', width: 70 },
          { lable: '订单ID', filed: 'orderID' },
          { lable: '问题描述', filed: 'custRemark' },
          { lable: '售后原因', filed: 'typeName' },
          { lable: '意向建议方案', filed: 'custPlanName' },
          { lable: '售后进度', filed: 'statusName' },
          { lable: '申请人', filed: 'creator' },
          { lable: '申请时间', filed: 'createtime' }
        ],
        // 得到的数据
        list: [],
        isSlot: true,
        statusText: [],
        // 参数
        listQuery: {
          pageIndex: 1,
          pageSize: 20
        },
        // 总条数
        total: null
      }
    }
  },
  computed: {
    ...mapState(['confLists'])
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
    // 处理订单
    handleOrder(id) {
      this.orderId = id
      this.isShowDialogObj.handle = true
    },
    toServiceDetail(id) {
      this.$router.push({ name: 'serviceDetail', query: { id: id } })
    },
    // 获取列表信息
    getList(o) {
      this.message.listQuery.limit = `${(this.message.listQuery.pageIndex - 1) * 20},${this.message.listQuery.pageSize}`
      this.message.listLoading = true
      const query = this.message.listQuery
      api
        .getServiceLists(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            var arr
            data.datas.forEach((item) => {
              arr = { ...item.after, order: { ...item.order } }
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
    handleOrderDialog
  }
}
</script>

<style lang="scss" scoped>
.g-home-layout {
  .body-top {
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
    .search-item {
      margin-left: 20px;
    }
    .search-btn {
      margin-left: 20px;
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
    .color-btn {
      padding: 3px 5px;
      color: #ffffff;
      border-radius: 2px;
    }
  }
}
</style>
