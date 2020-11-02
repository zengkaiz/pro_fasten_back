/**
 * dev  : zengkai
 * desc : 弹层基础组件  父组件确定方法名必须为：onSubmit
 * slot：body：弹框中间内容插槽；btn：弹框底部按钮插槽
 */
<template>
  <el-dialog :visible.sync="isShowDialog" :width="width" :before-close="handleClose" :close-on-click-modal="false" :modal="false">
    <div slot="title" class="dialogTitle">
      <span>{{title}}</span>
      <el-tooltip effect="dark" :content="'查看示例'" placement="bottom-start">
        <i v-if="isShowTitleIcon" class="el-icon-question" @click="iconFn"></i>
      </el-tooltip>
    </div>
    <slot name="body"></slot>
    <span slot="footer" class="dialog-footer">
      <div>
        <slot name="btn"></slot>
      </div>
      <div>
        <el-button v-if="buttonShow" size="mini" @click="handleClose">取 消</el-button>
        <el-button v-if="buttonShow" :loading="confirmDisabled" size="mini" type="primary" @click="handleSubmit">{{confirmBtnText}}</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'tjdialog',
  props: {
    confirmBtnText: {
      type: String,
      default: '确 定'
    },
    // 对话框展示状态
    isShowDialog: {
      type: Boolean,
      default: false
    },
    // 对话框标题
    title: {
      type: String,
      default: '提示'
    },
    // 对话框宽度
    width: {
      type: String,
      default: '600px'
    },
    // 是否显示按钮
    buttonShow: {
      type: Boolean,
      default: true
    },
    // 确认按钮是否禁用
    confirmDisabled: {
      type: Boolean,
      default: false
    },
    // 对话框宽度
    isShowTitleIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    /**
     * @function - 点击确定
     */
    handleSubmit() {
      this.$parent.onSubmit()
    },
    /**
     * @function - 点击关闭弹层
     */
    handleClose() {
      this.$parent.onClose()
      this.$emit('input', false)
    },
    iconFn() {
      this.$parent.onIconFn()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body {
  padding: 10px 20px;
}
.dialogTitle {
  font-size: 22px;
  color: #409eff;
  text-align: left;
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>
