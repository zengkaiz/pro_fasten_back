/**
 * dev  : zack
 * desc : 订单
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <div class="search">
          <b>订单id：</b>
          <el-input size="mini" v-model="message.listQuery.id" @keyup.enter.native="getList(true)"></el-input>
          <b class="search-item">订单状态：</b>
          <el-select v-model="message.listQuery.status" placeholder="请选择" size="mini">
            <el-option v-for="(key, value) in confLists.orderStatus" :key="value" :label="key" :value="value"></el-option>
          </el-select>
          <el-button class="search-btn" type="primary" size="mini" @click="getList(true)">搜索</el-button>
        </div>
      </div>
      <tableMode :message="message">
        <template slot="custRemark" slot-scope="prop">
          <p>{{prop.scope.row.userID}}</p>
          <div>{{prop.scope.row.custRemark}}</div>
        </template>
        <template slot="address" slot-scope="prop">
          <div>{{prop.scope.row.provinceName}} {{prop.scope.row.cityName}} {{prop.scope.row.districeName}} {{prop.scope.row.address}}</div>
        </template>
        <template slot="consignee" slot-scope="prop">
          <div>{{prop.scope.row.consignee}}</div>
          <div>{{prop.scope.row.consigneePhone}}</div>
        </template>
        <template slot="statusName" slot-scope="prop">
          <span class="color-btn" :style="{background: prop.scope.row.statusColor}">{{prop.scope.row.statusName}}</span>
        </template>
        <template slot="operater" slot-scope="prop">
          <div>{{prop.scope.row.operate.nickname}}</div>
          <div>{{prop.scope.row.operate.id}}</div>
        </template>
        <template slot="operate" slot-scope="prop">
          <div class="btn-icon">
            <div>
              <el-button type="primary" size="mini" @click="toOrderDetail(prop.scope.row.id)">查看</el-button>
            </div>
            <div>
              <el-button type="primary" :disabled="prop.scope.row.status !== '1'" size="mini" @click="handleOrder(prop.scope.row.id)">处理</el-button>
            </div>
            <div>
              <el-button type="primary" :disabled="prop.scope.row.status !== '20'" size="mini" @click="sendOutFn(prop.scope.row.id)">发货</el-button>
            </div>
            <div>
              <el-button type="primary" :disabled="prop.scope.row.status !== '1' && prop.scope.row.status !== '10'" size="mini" @click="cancelOrder(prop.scope.row.id)">取消</el-button>
            </div>
          </div>
        </template>
      </tableMode>
    </div>
    <!-- 发货 -->
    <sendoutDialog :id="orderId" :isShowDialog="isShowDialogObj.send" v-model="isShowDialogObj.send"></sendoutDialog>
    <!-- 处理 -->
    <handleOrderDialog :id="orderId" :isShowDialog="isShowDialogObj.handle" v-model="isShowDialogObj.handle"></handleOrderDialog>
    <!-- 取消 -->
    <cancelOrderDialog :id="orderId" :isShowDialog="isShowDialogObj.cancel" v-model="isShowDialogObj.cancel"></cancelOrderDialog>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import sendoutDialog from './components/sendOutDialog'
import handleOrderDialog from './components/handleOrderDialog'
import cancelOrderDialog from './components/cancelOrderDialog'
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
        fixedWidth: 100,
        maxHeight: '740',
        showEmpty: true,
        // 配置项
        items: [
          { lable: 'ID', filed: 'id', width: 70 },
          { lable: '客户描述', filed: '', scope: 'custRemark' },
          { lable: '收货人', filed: '', scope: 'consignee' },
          { lable: '收货地址', filed: '', scope: 'address' },
          { lable: '订单状态', filed: '', scope: 'statusName' },
          { lable: '后台操作备注', filed: 'operteRemark' },
          { lable: '操作人', filed: '', scope: 'operater' },
          { lable: '操作时间', filed: 'updatetime' }
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
    toOrderDetail(id) {
      this.$router.push({ name: 'orderDetail', query: { id: id } })
    },
    // 取消订单
    cancelOrder(id) {
      this.orderId = id
      this.isShowDialogObj.cancel = true
    },
    // 发货
    sendOutFn(id) {
      this.orderId = id
      this.isShowDialogObj.send = true
    },
    // 获取列表信息
    getList(o) {
      this.message.listQuery.limit = `${(this.message.listQuery.pageIndex - 1) * 20},${this.message.listQuery.pageSize}`
      this.message.listLoading = true
      const query = this.message.listQuery
      api
        .getOrderLists(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            var arr
            data.datas.forEach((item) => {
              arr = { ...item.city, ...item.intent, operate: { ...item.operate } }
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
    sendoutDialog,
    handleOrderDialog,
    cancelOrderDialog
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
      font-size: 20px;
      cursor: pointer;
      div {
        margin-bottom: 10px;
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
