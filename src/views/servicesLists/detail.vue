/**
 * dev  : zengkaiz
 * desc : 产品详情
 */
<template>
  <section class="g-service-detail-layout">
    <div class="body">
      <div class="body-center">
        <el-form v-if="serviceDetail" class="detail-form" label-width="0px">
          <el-form-item>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>售后原因：</span>
                <span>{{serviceDetail.after.typeName}}</span>
              </div>
              <div class="basic-info-item">
                <span>售后进度：</span>
                <span>{{serviceDetail.after.statusName}}</span>
              </div>
            </div>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>意向解决方案：</span>
                <span>{{serviceDetail.after.custPlanName}}</span>
              </div>
            </div>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>问题描述：</span>
                <span>{{serviceDetail.after.custRemark}}</span>
              </div>
            </div>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>客服操作备注：</span>
                <span>{{serviceDetail.after.operteRemark}}</span>
              </div>
            </div>
            <div class="body-pic">
              <span>上传的凭证：</span>
              <div v-for="item in serviceDetail.after.custResource" :key="item.id">
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
      serviceDetail: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getServiceLists(this.$route.query.id)
  },
  mounted() {},
  methods: {
    // 获取详情
    getServiceLists(id) {
      api.getServiceLists({ id: id })
        .then((data) => {
          this.serviceDetail = data.datas[0]
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
.g-service-detail-layout {
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
