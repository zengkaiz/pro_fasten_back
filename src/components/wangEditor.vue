<template>
  <div class="kindeditor">
    <div id="editorElem" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { mapState } from 'vuex'
/**
 * echoContent 富文本内容
 * uploadFileName 上传服务器文件名
 */
export default {
  name: 'editor',
  data() {
    return {
      editorContent: '',
      editor: null
    }
  },
  props: {
    echoContent: {
      type: String,
      default: ''
    },
    uploadFileName: {
      // 文件名
      type: String,
      default: 'file'
    }
  },
  computed: {
    ...mapState(['host']),
    url() {
      return `/feapi/profasten/admin/v1/file/upload`
    }
  },
  watch: {
    echoContent(newText, oldText) {
      if (newText !== oldText) {
        this.editor && this.editor.txt.html(newText)
      }
    }
  },
  mounted() {
    let This = this
    this.editor = new E('#editorElem')
    this.editor.customConfig.uploadImgServer = this.url // 上传图片到服务器
    this.editor.customConfig.uploadFileName = this.uploadFileName // 自定义 fileName
    this.editor.customConfig.uploadImgHooks = {
      before: function(xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function(xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(result, '上传图片成功结果')
      },
      fail: function(xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(result, '上传图片失败结果')
      },
      error: function(xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function(xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.url
        insertImg(url)

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }
    this.editor.customConfig.onchange = function(html) {
      // html 即变化之后的内容
      This.$emit('changeeditor', html)
    }
    this.editor.create()
  }
}
</script>
<style scoped>
.kindeditor {
  width: 718px;
  position: relative;
  z-index: 0;
}
</style>
