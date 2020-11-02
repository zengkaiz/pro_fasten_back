/**
 * dev  : zack
 * desc : 下单公告
 */
<template>
  <section class="g-news-layout">
    <div class="body">
      <div class="body-top">
        <div class="btn-area">
          <el-button type="primary" size="mini" @click="addNotice()" class="add-btn">添加</el-button>
        </div>
      </div>
      <tableMode :message="message">
        <template slot="switch" slot-scope="prop">
          <div>
            <el-switch
              @change="changeStatus(prop.scope.row.id, prop.scope.row.status)"
              v-model="prop.scope.row.status"
              active-value="10"
              inactive-value="44"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </div>
        </template>
        <template slot="operate" slot-scope="prop">
          <div class="btn-icon">
            <span class="el-icon-edit-outline" @click="editNotice(prop.scope.row.id)"></span>
          </div>
        </template>
      </tableMode>
    </div>
  </section>
</template>

<script>
import tableMode from '@/components/proTable'
import api from '@/apiFetch/api'
export default {
  name: '',
  props: {},
  data() {
    return {
      message: {
      // 有无序号
        hasSerialNumber: false,
        // 复选框
        isCheck: false,
        // 操作
        isShow: true,
        border: true,
        // 分页
        pageNeed: false,
        // 标识
        key: 'message',
        // loadding
        listLoading: false,
        // 宽度
        fixedWidth: 100,
        maxHeight: '740',
        showEmpty: true,
        // 配置项
        items: [
          { lable: 'ID', filed: 'id', width: 70 },
          { lable: '标题', filed: 'title' },
          // { lable: '内容', filed: '', scope: 'content' },
          { lable: '状态', filed: '', scope: 'switch' },
          { lable: '创建人', filed: 'updator' },
          { lable: '创建时间', filed: 'updatetime' }
        ],
        // 得到的数据
        list: [],
        isSlot: true,
        statusText: [],
        // 参数
        listQuery: {},
        // 总条数
        total: null
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.message.getList = () => {
      this.getList()
    }
    this.getList()
  },
  mounted() {},
  methods: {
    // 添加
    addNotice() {
      this.$router.push({ name: 'editNotice' })
    },
    // 编辑
    editNotice(id) {
      this.$router.push({ name: 'editNotice', query: { id: id } })
    },
    // 改变启用状态
    changeStatus(id, status) {
      let formData = new FormData()
      formData.append('id', id)
      formData.append('status', status)
      api
        .editNotice(formData)
        .then((data) => {
          this.getList()
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
    },
    // 获取列表信息
    getList(o) {
      this.message.listQuery.limit = `0,100`
      this.message.listLoading = true
      const query = this.message.listQuery
      api
        .getNoticeLists(query)
        .then((data) => {
          if (data) {
            this.message.list = []
            var obj
            data.datas.forEach((item) => {
              obj = { ...item.notice, creator: { ...item.creator } }
              this.message.list.push(obj)
            })
            this.message.total = Number(data.totalrows)
          }
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
        .finally(() => {
          this.message.listLoading = false
        })
    }
  },
  filters: {},
  components: {
    tableMode
  }
}
</script>

<style lang="scss" scoped>
.g-news-layout {
  .body-top {
    display: flex;
    justify-content: space-between;
  }
  .search {
    .el-input {
      width: 300px;
    }
    /deep/ .el-badge__content.is-fixed {
      top: 0px;
    }
  }
  .btn-area {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
    .icon {
      font-size: 22px;
      cursor: pointer;
    }
  }
  .body {
    h1 {
      margin-bottom: 15px;
    }
    .add-btn {
      margin: 10px 0;
    }
    .btn-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
