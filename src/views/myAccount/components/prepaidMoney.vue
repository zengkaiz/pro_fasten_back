/**
 * dev  : zack
 * desc : 我的账户-预存款项模块
 */
<template>
  <section class="g-prepaidMoney-layout">
    <el-form ref="form" :model="form" :rules="rules" :label-position="'right'" label-width="100px">
      <el-form-item label="手机号" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input size="mini" v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button size="mini" type="danger" @click="submitForm">修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'prepaidMoney',
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
