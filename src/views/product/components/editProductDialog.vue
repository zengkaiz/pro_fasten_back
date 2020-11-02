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
          <el-form-item label="产品名称：" prop="name">
            <el-input type="text" v-model="form.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="产品分类：" prop="cateID">
            <el-select v-model="form.cateID" placeholder="请选择" size="mini" class="inputStyle">
              <el-option v-for="item in cateLists" :key="item.category.id" :label="item.category.name" :value="item.category.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片：" prop="pic">
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <el-upload
              multiple
              accept="jpg, jpeg, png"
              class="upload-demo"
              :action="uploadUrl"
              :before-upload="beforeUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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
    productInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      fileList: [],
      cateLists: [],
      uoloadLoading: false,
      loading: false,
      isShowDialogObj: {},
      rules: {
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        cateID: [{ required: true, message: '请选择产品分类', trigger: 'change' }],
        pic: [{ required: true, message: '请上传产品图片', trigger: 'change' }]
      },
      isShow: false,
      form: {},
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
    isShowDialog: {
      immediate: true,
      handler: function() {
        this.isShow = this.isShowDialog
        if (this.isShow) {
          console.log(window.location)
          this.getListsCate()
          if (this.productInfo && this.productInfo.id) {
            this.form = {
              id: this.productInfo.id,
              name: this.productInfo.name,
              cateID: this.productInfo.cateID,
              pic: this.productInfo.pic
            }
          } else {
            this.form = {
              pic: [],
              cateID: this.productInfo.cateID
            }
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
    uploadUrl() {
      return `/feapi/profasten/admin/v1/file/upload`
    },
    dialogTitle() {
      if (this.productInfo && this.productInfo.id) {
        return `编辑产品`
      } else {
        return '新增产品'
      }
    }
  },
  mounted() {},
  methods: {
    beforeUpload(file) {
      this.uoloadLoading = true
      if (this.fileList.length >= 10) {
        this.$message.error('最多支持可上传10张图片')
        return
      }
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 20MB!')
      }
      return isLt2M
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res, file, fileList) {
      if (res && file.response.url) {
        this.fileList.push(file)
        this.uoloadLoading = false
      }
    },
    handleError() {
      this.$message.error('非法的上传格式')
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    getListsCate() {
      const query = {}
      query.limit = `0,100`
      api
        .getListsCate(query)
        .then((data) => {
          if (data) {
            this.cateLists = data.datas
          }
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
    },
    onSubmit() {
      let picArr = []
      this.fileList.forEach((item) => {
        if (item.response) {
          picArr.push(item.response)
        } else {
          let temp = {
            name: item.name,
            url: item.url,
            size: item.size,
            id: item.id
          }
          picArr.push(temp)
        }
      })
      this.form.pic = picArr
      this.$refs.form.validate((valid) => {
        if (valid) {
          var formData = new FormData()
          formData.append('name', this.form.name)
          formData.append('cateID', this.form.cateID)
          if (this.productInfo.id) {
            formData.append('id', this.productInfo.id)
          }
          for (let i = 0; i < this.form.pic.length; i++) {
            formData.append(`pic[${i}][name]`, this.form.pic[i].name)
            formData.append(`pic[${i}][url]`, this.form.pic[i].url)
            formData.append(`pic[${i}][size]`, this.form.pic[i].size)
            formData.append(`pic[${i}][id]`, this.form.pic[i].id)
          }
          api.saveShow(formData)
            .then(() => {
              this.$message.success('保存成功')
              this.isShow = false
              this.fileList = []
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
