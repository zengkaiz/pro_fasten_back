/**
 * dev  : zengkaiz
 * desc : 新增/编辑 新闻公告
 */
<template>
  <section class="g-news-add-layout">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="110px"
      @submit.native.prevent
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.2)"
    >
      <el-form-item label="标题：" prop="title">
        <el-input type="text" v-model="form.title" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <WangEditor v-model="form.content" @changeeditor="getEditorContent" :echoContent="editorText"></WangEditor>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import WangEditor from '@/components/wangEditor'
import api from '@/apiFetch/api'
export default {
  data() {
    return {
      loading: false,
      id: '',
      editorText: '', // 回显富文本
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请编写正文', trigger: 'blur' }]
      },
      isShow: false,
      form: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.id = this.$route.query.id
    this.id && (this.getNewsLists())
  },
  mounted() {},
  methods: {
    getEditorContent(val) {
      this.form.content = val
    },
    getNewsLists() {
      this.loading = true
      api
        .getNewsLists({ id: this.id })
        .then((data) => {
          if (data) {
            this.form = {
              id: this.id,
              title: data.datas[0].news.title,
              content: data.datas[0].news.content,
              status: data.datas[0].news.status
            }
            this.editorText = data.datas[0].news.content
            this.loading = false
          }
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
          this.loading = false
        })
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          this.id && (formData.append('id', this.id))
          formData.append('title', this.form.title)
          formData.append('content', this.form.content)
          formData.append('status', 10)
          api.saveNotice(formData)
            .then(() => {
              this.$message.success('保存成功')
              this.isShow = false
              this.form = {}
              this.$router.push('/notice')
            })
            .catch((err) => {
              this.$message.error(err.errorMsg)
            })
        }
      })
    },
    handleClose() {
      this.$router.back()
    }
  },
  filters: {},
  components: {
    WangEditor
  }
}
</script>

<style lang="scss" scoped>
</style>
