/**
 * dev  : zengkaiz_1
 * desc : 处理订单
 */
<template>
  <section class="g-edit-dialog-layout">
    <proDialog title="售后处理" :isShowDialog="isShow" v-model="isShow" :buttonShow="true" :width="'500px'" v-if="confLists">
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
          <el-form-item label="处理结果：" prop="status">
            <el-select v-model="form.status" placeholder="请选择" size="mini">
              <el-option v-for="(key, value) in confLists.afterServiceStatusAdminHandle" :key="value" :label="key" :value="value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" prop="operteRemark">
            <el-input type="textarea" v-model="form.operteRemark" size="mini"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </proDialog>
  </section>
</template>

<script>
import proDialog from '@/components/proDialog'
import api from '@/apiFetch/api'
import { mapState } from 'vuex'
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
        status: [{ required: true, message: '请选择处理结果', trigger: 'change' }],
        operteRemark: [{ required: true, message: '请输入客服操作备注', trigger: 'blur' }]
      },
      isShow: false,
      form: {}

    }
  },
  computed: {
    ...mapState(['confLists'])
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
          formData.append('id', this.id)
          formData.append('status', this.form.status)
          formData.append('operteRemark', this.form.operteRemark)
          api.handleService(formData)
            .then(() => {
              this.$message.success('操作成功')
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
