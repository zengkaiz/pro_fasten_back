/**
 * dev  : zack
 * desc : 我的账户-发票信息模块
 * props:
 * emit :
 * slot :
 */
<template>
  <section class="g--layout">
    <el-form ref="form" :model="form" :rules="rules" :label-position="'right'" label-width="120px">
      <el-form-item label="发票类型">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="单位名称" prop="name">
        <el-input size="mini" v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item label="纳税人识别号" prop="name">
        <el-input size="mini" v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button size="mini" type="danger" @click="submitForm">添加发票+</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'invoiceInfo',
  props: {},
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        region: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        type: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {

        }
      })
    }
  },
  filters: {},
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
