/**
* dev ：zack
* desc：table组件-在elementUi的table组件上又继续封装了一层，在页面初始化的时候将定义好的参数传入即可
 * props: message---见调用页面
*/
<template>
  <section class="g-totalTable-layout">
    <el-table
      :row-class-name="handleButton"
      :data="message.list"
      element-loading-text="数据加载中..."
      fit
      stripe
      highlight-current-row
      :border="message.border"
      v-loading="message.listLoading"
      @selection-change="handleSelectionChange"
      :max-height="message.maxHeight"
      @sort-change="handleSort"
      :default-sort="sortRule"
    >
      <div slot="empty">{{message.showEmpty?'暂无数据':''}}</div>
      <el-table-column align="center" type="selection" width="55" label="全选" v-if="message.isCheck" fixed="left"></el-table-column>
      <el-table-column v-if="message.hasSerialNumber" fixed label="序号" align="center" width="50">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column
        :fixed="theadList.fixed"
        :align="theadList.align ? theadList.align : 'center'"
        v-for="(theadList,index) in message.items"
        :key="index"
        :label="theadList.lable"
        :sortable="theadList.prop"
        :width="theadList.width"
        :min-width="theadList.minWidth"
        :prop="theadList.filed"
        :show-overflow-tooltip="theadList.tooltip"
        :class-name="theadList.overflow?'text-overflow':''"
      >
        <template slot-scope="scope">
          <div v-if="!theadList.filed">
            <slot :name="theadList.scope" :scope="scope"></slot>
          </div>
          <el-tooltip v-if="theadList.tooltip" :content="`${scope.row[theadList.filed]}`">
            <!-- table中除了有操作项的点击事件，扩展了其他列的点击事件，通过在父组件配置link来在本组件返回到子组件，通过子组件的方法来判断link的值从而执行不同的事件 -->
            <span v-if="theadList.link" @click.stop="handleLink(theadList.link,scope.row)" class="link">{{scope.row[theadList.filed]}}</span>
            <span v-if="!theadList.link">{{scope.row[theadList.filed]}}</span>
          </el-tooltip>
          <template v-else>
            <div v-if="theadList.link && !theadList.isShowDetail" @click.stop="handleLink(theadList.link,scope.row)" class="link">
              <span>{{scope.row[theadList.filed]}}</span>
            </div>
            <div v-if="theadList.link && theadList.isShowDetail">
              <span style="width:80%;">{{scope.row[theadList.filed]}}</span>
              <i v-if="theadList.isShowDetail" class="sd" @click.stop="handleLink(theadList.link,scope.row)">详情</i>
            </div>
            <span v-if="!theadList.link && !theadList.popover" slot="reference">{{scope.row[theadList.filed]}}</span>
            <el-popover v-if="!theadList.link && theadList.popover && scope.row[theadList.content]" placement="top-start" trigger="hover" :content="scope.row[theadList.content]">
              <span slot="reference">{{scope.row[theadList.filed]}}</span>
            </el-popover>
            <span v-if="!theadList.link && theadList.popover && !scope.row[theadList.content]" slot="reference">{{scope.row[theadList.filed]}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" :width="message.fixedWidth" class-name="small-padding" fixed="right" v-if="message.isShow">
        <template slot-scope="scope">
          <div v-if="message.isSlot">
            <slot name="operate" :scope="scope"></slot>
          </div>
          <div v-else>
            <div class="operate-button" type="text" v-for="(status,index) in message.statusText" :key="index" @click.stop="handleEdit(status,scope.row,scope)">
              <!-- 该template里是特殊处理动态的自定义按钮 -->
              <!-- 文字 -->
              <span v-if="!status.isBtn&&!status.isSwitch">{{status.state}}</span>
              <!-- 图标按钮 -->
              <el-tooltip v-else-if="status.icon" :content="status.state" :open-delay="500" placement="top">
                <el-button size="mini" :icon="status.icon" :type="status.type"></el-button>
              </el-tooltip>
              <!-- 滑块 -->
              <el-tooltip v-else-if="status.isSwitch" :content="scope.row[status.state]?status.inactiveValue:status.activeValue" placement="top">
                <el-switch v-model="scope.row[status.state]" active-color="#13ce66" inactive-color="#909399"></el-switch>
              </el-tooltip>
              <!-- 正常按钮 -->
              <el-button v-else size="mini" :type="status.type">{{status.state}}</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!message.listLoading" class="pagination-container" v-if="message.pageNeed">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="message.listQuery.pageIndex"
        :page-size="message.listQuery.pageSize"
        layout="total, prev, pager, next"
        :total="message.total"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  /**
   * 模板信息渲染列表的参数
   * @type {Object}
   */
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sortRule: { prop: null, order: null }
    }
  },
  created() {
  },
  methods: {
    // 处理排序
    handleSort(column) {
      if (column.order !== null) {
        let data = []
        for (let i = 0; i < this.message.list.length; i++) {
          let key = this.message.list[i]
          if (key[column.prop]) {
            data.push(key)
          } else {
            data.unshift(key)
          }
        }
        // 2层
        if (this.$parent.$parent.childHandleSort) {
          this.$parent.$parent.childHandleSort(data)
        } else if (this.$parent.childHandleSort) {
          // 1层
          this.$parent.childHandleSort(data)
        } else if (this.$parent.$parent.$parent.childHandleSort) {
          console.log(this.$parent.$parent.$parent)
          // 3 层 再多就在网上加吧 要不就写个递归 暂时就先这样吧 应该足够了
          this.$parent.$parent.$parent.childHandleSort(data)
        } else {
          // 4 层 再多就在网上加吧 要不就写个递归 暂时就先这样吧 应该足够了
          this.$parent.$parent.$parent.$parent.$parent.childHandleSort(data)
        }
      }
      this.sortRule.order = column.order
      this.sortRule.prop = column.prop
    },
    pageCount(val) {
      let pageCount = this.message.total / val
      if (pageCount > 6) {
        this.message.hideLastBtn = true
      } else {
        this.message.hideLastBtn = false
      }
    },
    /**
     * 页容量变化
     * @param {String} val 页容量值
     */
    handleCurrentChange(val) {
      if (this.$parent.$parent[this.message.key]) {
        this.$parent.$parent[this.message.key].listQuery.pageIndex = val
        this.$parent.$parent[this.message.key].getList()
      } else if (this.$parent[this.message.key]) {
        this.$parent[this.message.key].listQuery.pageIndex = val
        this.$parent[this.message.key].getList()
      } else {
        this.$emit('handleCurrentChange', val)
      }
    },
    /**
     * 当前页变化
     * @param {Number} link 当前跳转类型
     * @param {Object} data 行数据
     */
    handleLink(link, data) {
      this.$parent.childHandleLink(link, data)
    },
    /**
     * 操作项事件
     * @param {Object} status statusText按钮配置项
     * @param {Object} data 行数据
     */
    handleEdit(status, row, scope) {
      if (this.$parent.childStatus) {
        this.$parent.childStatus(status, row, scope)
      } else if (this.$parent.$parent.childStatus) {
        this.$parent.$parent.childStatus(status, row, scope)
      } else {
        this.$emit('childStatus', status, row, scope)
      }
    },
    /**
     * 控制操作按钮的显示隐藏
     * @param {Object} status statusText按钮配置项
     * @param {Object} data 行数据
     */
    handleButton(row, rowIndex) {
      // this.$parent.childStatus(status, data)
      if (this.$parent.childButton) {
        return this.$parent.childButton(row, rowIndex)
      } else if (this.$parent.$parent.childButton) {
        return this.$parent.$parent.childButton(row, rowIndex)
      } else {
        return 'normal'
      }
    },
    /**
     * 当选择项发生变化时会触发该事件
     * @param {String} val 当前选择值
     */
    handleSelectionChange(val) {
      // this.$parent.childSelectionChange(val)
      if (this.$parent.childSelectionChange) {
        this.$parent.childSelectionChange(this.message.key, val)
      } else if (this.$parent.$parent.childSelectionChange) {
        this.$parent.$parent.childSelectionChange(this.message.key, val)
      } else {
        this.$emit('childSelectionChange', this.message.key, val)
      }
    }
  }
}
</script>
<style lang="scss">
.el-table {
  border: 1px solid #ebeef5;
  position: relative;
  th {
    padding: 0;
    color: #343743;
    background: #f1f1f3;
    color: #343743;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
  }
  td {
    font-size: 12px;
    .el-button.el-button--text {
      padding: 0;
    }
  }
}
</style>
<style lang='scss' scoped>
.g-totalTable-layout {
  /deep/ .opearte-none .operate-button {
    display: none;
  }
  .el-pagination {
    text-align: left;
  }
  .operate-button {
    display: inline-block;
    margin-left: 5px;
  }
  .txtInfo {
    color: #599900;
  }
  .sd {
    color: #6799d9;
  }
  .link {
    color: #6799d9;
    cursor: pointer;
    text-align: left !important;
    display: flex;
    align-items: center;
  }
  .redWord {
    color: red;
  }
  .pagination-container {
    padding: 10px 0;
  }
}
</style>
