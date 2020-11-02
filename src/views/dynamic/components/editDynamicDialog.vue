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
          <el-form-item label="分类：" prop="type">
            <el-select v-model="form.type" placeholder="请选择" size="mini" class="inputStyle">
              <el-option v-for="(key, value) in confLists.dynamicType" :key="key" :label="key" :value="value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权重：" prop="sort">
            <el-input type="number" v-model="form.sort" size="mini"></el-input>
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
import { mapState } from 'vuex'

export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    info: {
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
        type: [{ required: true, message: '请选择图片分类', trigger: 'change' }],
        sort: [{ required: true, message: '请输入图片排序权重', trigger: 'blur' }],
        pic: [{ required: true, message: '请上传图片', trigger: 'change' }]
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
          this.getListsCate()
          if (this.info) {
            this.form = {
              id: this.info.id,
              sort: this.info.sort,
              type: this.info.type,
              pic: this.info.pic
            }
            this.fileList = this.info.pic
          } else {
            this.form = {
              pic: []
            }
            this.fileList = []
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
  computed: {
    ...mapState(['confLists']),
    uploadUrl() {
      return `/feapi/profasten/admin/v1/file/upload`
    },
    dialogTitle() {
      if (this.info) {
        return `编辑动态图片`
      } else {
        return '新增动态图片'
      }
    }
  },
  mounted() {},
  methods: {
    beforeUpload(file) {
      if (this.fileList.length >= 1) {
        this.$message.error('只可上传一张图片')
        return
      }
      this.uoloadLoading = true
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
      if (file.response.url) {
        this.fileList.push(file)
      }
      this.uoloadLoading = false
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
          formData.append('type', this.form.type)
          formData.append('sort', this.form.sort)
          if (this.info) {
            formData.append('id', this.info.id)
          }
          for (let i = 0; i < this.form.pic.length; i++) {
            formData.append(`pic[${i}][name]`, this.form.pic[i].name)
            formData.append(`pic[${i}][url]`, this.form.pic[i].url)
            formData.append(`pic[${i}][size]`, this.form.pic[i].size)
            formData.append(`pic[${i}][id]`, this.form.pic[i].id)
          }
          api.saveDynamic(formData)
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
  .el-select--mini {
    width: 180px;
  }
  /deep/ .el-input__inner {
    width: 180px;
  }
}
</style>
