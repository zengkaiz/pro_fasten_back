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
          <el-form-item label="分类名称：" prop="name">
            <el-input type="text" v-model="form.name" size="mini"></el-input>
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
    classInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      admins: [],
      loading: false,
      isShowDialogObj: {},
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
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
          if (this.classInfo) {
            this.form = {
              id: this.classInfo.id,
              name: this.classInfo.name
            }
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
      if (this.classInfo) {
        return `编辑分类`
      } else {
        return '新增分类'
      }
    }
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('name', this.form.name)
          if (this.classInfo) {
            formData.append('id', this.classInfo.id)
          }
          api.saveCate(formData)
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
.el-form{
  text-align: left;
}
.select-admin .el-input--mini{
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
