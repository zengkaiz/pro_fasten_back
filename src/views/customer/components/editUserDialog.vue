/**
 * dev  : zengkaiz_1
 * desc : 疑问
 */
<template>
  <section class="g-edit-dialog-layout">
    <proDialog :title="dialogTitle" :isShowDialog="isShow" v-model="isShow" :buttonShow="true" :width="'500px'">
      <template slot="body">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="110px"
          @submit.native.prevent
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-form-item label="昵称：" prop="nickName">
            <el-input type="text" v-model="form.nickName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：" prop="userName">
            <el-input type="text" v-model="form.userName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input type="text" v-model="form.phone" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" v-if="!userInfo">
            <el-input type="text" v-model="form.password" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="密码：" v-else>
            <el-input type="text" v-model="form.password" size="mini"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </proDialog>
  </section>
</template>

<script>
import proDialog from '@/components/proDialog'
import api from '@/apiFetch/api'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      isShowDialogObj: {},
      rules: {
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      },
      isShow: false,
      form: {}

    }
  },
  watch: {
    isShowDialog: {
      immediate: true,
      handler: function() {
        this.isShow = this.isShowDialog
        if (this.isShow) {
          if (this.userInfo) {
            this.form = {
              id: this.userInfo.id,
              nickName: this.userInfo.nickName,
              userName: this.userInfo.userName,
              phone: this.userInfo.phone,
              password: this.userInfo.password
            }
            console.log(this.form)
          } else {
            this.form = {}
          }
        }
      }
    },
    isShow: {
      immediate: true,
      handler: function() {
        this.$emit('input', this.isShow)
      }
    }
  },
  created() {},
  computed: {
    dialogTitle() {
      if (this.userInfo) {
        return `编辑用户`
      } else {
        return '新增用户'
      }
    }
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('id', this.userInfo.id)
          formData.append('nickName', this.form.nickName)
          formData.append('userName', this.form.userName)
          formData.append('phone', this.form.phone)
          formData.append('password', this.form.password)
          api.saveUser(formData)
            .then(() => {
              this.$message.success('保存成功')
              this.isShow = false
              this.$parent.getList()
            })
            .catch((err) => {
              this.$message.error(err.errorMsg)
            })
        }
      })
    },
    onClose() {}
  },
  filters: {},
  components: {
    proDialog
  }
}
</script>

<style lang="scss">
.v-modal {
  opacity: 0 !important;
}
.el-upload-list--picture .el-upload-list__item {
  width: 300px;
  margin-right: 20px;
  display: inline-block;
}
</style>
<style lang="scss" scoped>
.g-edit-dialog-layout {
  .el-input {
    width: 300px;
  }
}
</style>
