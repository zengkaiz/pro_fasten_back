/**
 * dev  : zengkaiz
 * desc : 产品详情
 */
<template>
  <section class="g-product-detail-layout">
    <div class="body">
      <div class="body-center">
        <el-form v-if="orderDetail" class="detail-form" label-width="0px">
          <el-form-item>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>商品名称：</span>
                <span>{{orderDetail.intent.productName}}</span>
              </div>
              <div class="basic-info-item">
                <span>分类名称：</span>
                <span>{{orderDetail.intent.typeName}}</span>
              </div>
              <div class="basic-info-item">
                <span>订单状态：</span>
                <span>{{orderDetail.intent.statusName}}</span>
              </div>
            </div>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>收货人：</span>
                <span>{{orderDetail.intent.consignee}} {{orderDetail.intent.consigneePhone}}</span>
              </div>
              <div class="basic-info-item">
                <span>收货地址：</span>
                <span>{{orderDetail.intent.provinceName}} {{orderDetail.intent.cityName}} {{orderDetail.intent.districeName}} {{orderDetail.intent.address}}</span>
              </div>
            </div>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>客户描述：</span>
                <span>{{orderDetail.intent.custRemark}}</span>
              </div>
            </div>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>客服操作备注：</span>
                <span>{{orderDetail.intent.operteRemark}}</span>
              </div>
            </div>
            <div class="body-pic">
              <span>附件详情：</span>
              <div v-for="item in orderDetail.intent.resource" :key="item.id">
                <el-image fit="fill" :src="item.url"></el-image>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/apiFetch/api'
export default {
  data() {
    return {
      orderDetail: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getOrderLists(this.$route.query.id)
  },
  mounted() {},
  methods: {
    // 获取详情
    getOrderLists(id) {
      api.getOrderLists({ id: id })
        .then((data) => {
          this.orderDetail = data.datas[0]
        })
        .catch((err) => {
          this.$message.error(err.errorMsg)
        })
    }
  },
  filters: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.g-product-detail-layout {
  min-height: 100vh;
  background: #ffffff;
  font-size: 12px;
  margin-top: 100px;
  .body {
    padding: 0 110px;
    margin-top: -85px;
    .body-center {
      background: #ffffff;
      padding: 40px;
      box-shadow: 0 4px 6px 0 rgba(48, 48, 77, 0.05), 0 2px 4px 0 rgba(48, 48, 77, 0.05);
      border-radius: 12px;
      border-radius: 12px;
      .basic-info {
        display: flex;
        .basic-info-item {
          span:nth-child(1) {
            font-weight: bold;
          }
          span:nth-child(2) {
            margin-right: 25px;
          }
        }
      }
      .body-pic {
        text-align: left;
        span:nth-child(1) {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
