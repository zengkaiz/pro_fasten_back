/**
 * dev  : yjinw
 * desc : 说明
 * props:
 * emit :
 * slot :
 */
<template>
  <section class="g--layout">
    <!--浮动窗口-->
    <div class="floatdiv" id="floatt">
      <!--电话-->
      <div class="ftel">
        <div class="ptel">
          <i class="iconfont"></i>
        </div>
        <p>服务热线</p>
        <div class="fdtel">
          <span>400-8076-999</span>
        </div>
      </div>
      <!--qq-->
      <div class="fqq">
        <div class="pqq">
          <i class="iconfont"></i>
        </div>
        <a class="addstyleA" href="javaScript:void(0);">接单QQ</a>
        <div class="fdqq">
          <span>点击选择接单员</span>
        </div>
      </div>
      <!--二维码-->
      <div class="fwChat">
        <div class="pWchat">
          <i class="iconfont">
            <img src width="34" height="34" />
          </i>
        </div>
        <p>二维码</p>
        <div class="fdWChat">
          <img src />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  props: {},
  data() { return {} },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
  filters: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.floatdiv,
.floatdivHide {
  position: fixed;
  right: 0;
  bottom: 158px;
  z-index: 888;
  width: 76px;
  height: auto;
  margin-top: 28px;
  color: #666;
  font: 12px/24px '微软雅黑';
  text-align: center;
  background: #f7f7f7;
  .ftel,
  .fwChat,
  .fwChat a {
    width: 74px;
    height: 78px;
    border: 1px solid #fff;
  }
  .fdqq {
    display: none;
    position: absolute;
    top: 0;
    right: 76px;
    z-index: 56;
    padding-bottom: 5px;
    width: 276px;
    min-height: 77px;
    height: auto;
    background: #ffc400;
    display: none;
    text-align: left;
  }
}
</style>
