/**
 * dev  : zack
 * desc : 我的账户-密码修改模块
 */
<template>
  <section class="g-psw-layout">
    <div class="tips">
      <span>温馨提示：长度6-16位字符，支持数字、大小写字母和英文标点符号。</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" :label-position="'right'" label-width="100px">
      <el-form-item label="原密码" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="name">
        <el-input size="mini" v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="name">
        <el-input size="mini" v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button size="mini" type="danger" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'pswModify',
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
.g-psw-layout {
  .tips {
    width: 100%;
    height: 24px;
    line-height: 24px;
    color: #949494;
    background: #e60000;
    text-align: left;
    margin-bottom: 10px;
    span {
      display: inline-block;
      font-size: 7px;
      -webkit-transform: scale(0.7, 0.7);
    }
  }
}
</style>
