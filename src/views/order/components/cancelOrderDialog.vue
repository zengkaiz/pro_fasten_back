/**
 * dev  : zengkaiz_1
 * desc : 取消订单
 */
<template>
  <section class="g-edit-dialog-layout">
    <proDialog title="取消订单" :isShowDialog="isShow" v-model="isShow" :buttonShow="true" :width="'500px'">
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
          <el-form-item label="取消原因：" prop="reason">
            <el-input type="textarea" v-model="form.reason" size="mini"></el-input>
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
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      admins: [],
      loading: false,
      isShowDialogObj: {},
      rules: {
        reason: [{ required: true, message: '请输入取消原因', trigger: 'blur' }]
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
          this.form = {}
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
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('orderID', this.id)
          formData.append('reason', this.form.reason)
          api.cancelOrder(formData)
            .then(() => {
              this.$message.success('已取消')
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
.el-form {
  text-align: left;
}
.select-admin .el-input--mini {
  width: 200px;
}
</style>
<style lang="scss" scoped>
.g-edit-dialog-layout {
  .el-input {
    width: 300px;
  }
}
.el-select--mini {
  width: 100px;
}
</style>
