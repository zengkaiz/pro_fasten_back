/**
 * dev  : zengkaiz
 * desc : 产品详情
 */
<template>
  <section class="g-product-detail-layout">
    <div class="body">
      <div class="body-center">
        <el-form v-if="productDetail" class="detail-form" label-width="0px">
          <el-form-item>
            <h2>{{productDetail.show.name}}</h2>
            <div class="basic-info">
              <div class="basic-info-item">
                <span>分类名称：</span>
                <span>{{productDetail.cate.name}}</span>
              </div>
              <div class="basic-info-item">
                <span>最新修改人：</span>
                <span>{{productDetail.show.creator}}</span>
              </div>
              <div class="basic-info-item">
                <span>更新时间：</span>
                <span>{{productDetail.show.createtime}}</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <span v-for="item in productDetail.show.pic" :key="item.id">
              <el-image fit="fill" :src="item.url"></el-image>
            </span>
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
      productDetail: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getShowLists(this.$route.query.id)
  },
  mounted() {},
  methods: {
    // 获取详情
    getShowLists(id) {
      api.getShowLists({ id: id })
        .then((data) => {
          this.productDetail = data.datas[0]
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
            font-size: 12px;
            color: #676b87;
          }
          span:nth-child(2) {
            font-size: 12px;
            color: #a6acb7;
            margin-right: 25px;
          }
        }
      }
    }
  }
}
</style>
