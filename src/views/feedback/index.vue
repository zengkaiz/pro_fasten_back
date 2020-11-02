/**
 * dev  : zack
 * desc : 评价
 */
<template>
  <section class="g-home-layout">
    <div class="body">
      <div class="body-top">
        <div class="search">
          <b>订单id：</b>
          <el-input size="mini" v-model="message.listQuery.id" @keyup.enter.native="getList(true)"></el-input>
          <b class="search-item">评价星级：</b>
          <el-select v-model="message.listQuery.status" placeholder="请选择" size="mini">
            <el-option v-for="(key, value) in confLists.orderStatus" :key="value" :label="key" :value="value"></el-option>
          </el-select>
          <el-button class="search-btn" type="primary" size="mini" @click="getList(true)">搜索</el-button>
        </div>
      </div>
      <tableMode :message="message">
        <template slot="orderID" slot-scope="prop">
          <div>{{prop.scope.row.orderID}}</div>
        </template>
        <template slot="statusName" slot-scope="prop">
          <el-rate class="star" v-model="prop.scope.row.status" disabled></el-rate>
        </template>
        <template slot="address" slot-scope="prop">
          <div>{{prop.scope.row.provinceName}} {{prop.scope.row.cityName}} {{prop.scope.row.districeName}} {{prop.scope.row.address}}</div>
        </template>
        <template slot="consignee" slot-scope="prop">
          <div>{{prop.scope.row.consignee}}</div>
          <div>{{prop.scope.row.consigneePhone}}</div>
        </template>
        <template slot="operater" slot-scope="prop">
          <div>{{prop.scope.row.creator.nickName}}</div>
          <div>{{prop.scope.row.creator.phone}}</div>
        </template>
      </tableMode>
    </div>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
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
        isShow: false,
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
          { lable: '评价ID', filed: 'id', width: 70 },
          { lable: '订单ID', filed: '', scope: 'orderID' },
          { lable: '评价星级', filed: '', scope: 'statusName' },
          { lable: '星级描述', filed: 'statusName' },
          { lable: '评价内容', filed: 'reason' },
          { lable: '评价人', filed: '', scope: 'operater' },
          { lable: '评价时间', filed: 'updatetime' }
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
        .getFeedbackLists(query)
        .then((data) => {
          if (data) {
            data.datas.forEach((item) => {
              item.feedback.status = Number(item.feedback.status)
            })
            this.message.list = []
            var arr
            data.datas.forEach((item) => {
              arr = { ...item.feedback, creator: { ...item.creator } }
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
  }
}
</style>
