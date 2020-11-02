/**
 * dev  : zengkaiz_1
 * desc : 发货
 */
<template>
  <section class="g-edit-dialog-layout">
    <proDialog title="发货" :isShowDialog="isShow" v-model="isShow" :buttonShow="true" :width="'500px'">
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
          <el-form-item label="发货公司：" prop="sendOutGoodsCompany">
            <el-select v-model="form.sendOutGoodsCompany" placeholder="请选择" size="mini">
              <el-option v-for="item in confLists.expreeCompany" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货单号：" prop="tracking">
            <el-input type="text" v-model="form.tracking" size="mini"></el-input>
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
        sendOutGoodsCompany: [{ required: true, message: '请选择发货公司', trigger: 'blur' }],
        tracking: [{ required: true, message: '请输入发货单号', trigger: 'blur' }]
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
  computed: {
    ...mapState(['confLists'])
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('id', this.id)
          formData.append('sendOutGoodsCompany', this.form.sendOutGoodsCompany)
          formData.append('tracking', this.form.tracking)
          api.sendOut(formData)
            .then(() => {
              this.$message.success('发货成功')
              this.isShow = false
              this.form = {}
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
