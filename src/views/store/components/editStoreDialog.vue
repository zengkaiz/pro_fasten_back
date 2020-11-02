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
          <el-form-item label="门店名称：" prop="name">
            <el-input type="text" v-model="form.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="管理员：" prop="name">
            <el-select class="select-admin" v-model="form.adminID" placeholder="请选择管理员" size="mini">
              <el-option v-for="item in admins" :key="item.admin.id" :label="item.admin.nickName" :value="item.admin.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市：" prop="name">
            <el-select v-model="form.provinceUuid" placeholder="省" size="mini" class="inputStyle">
              <el-option v-for="item in provinces" :key="item.city.value" :label="item.city.name" :value="item.city.uuid"></el-option>
            </el-select>
            <el-select v-model="form.cityUuid" placeholder="市" size="mini" class="inputStyle">
              <el-option v-for="item in cities" :key="item.city.value" :label="item.city.name" :value="item.city.uuid"></el-option>
            </el-select>
            <el-select v-model="form.districtUuid" placeholder="区（县）" size="mini" class="inputStyle">
              <el-option v-for="item in counties" :key="item.city.value" :label="item.city.name" :value="item.city.uuid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店地址：" prop="address">
            <el-input type="text" v-model="form.address" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input type="text" v-model="form.phone" size="mini"></el-input>
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
    storeInfo: {
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
        name: [{ required: true, message: '请输入门店名称', trigger: 'blur' }],
        adminID: [{ required: true, message: '请选择门店管理员', trigger: 'change' }],
        provinceUuid: [{ required: true, message: '请选择门店城市', trigger: 'change' }],
        cityUuid: [{ required: true, message: '请选择门店城市', trigger: 'change' }],
        address: [{ required: true, message: '请输入门店地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
      },
      isShow: false,
      form: {},
      provinces: [],
      cities: [],
      counties: []

    }
  },
  watch: {
    'form.provinceUuid': {
      immediate: true,
      handler: function() {
        if (this.isShow) {
          this.getCities('cities', this.form.provinceUuid)
        }
      }
    },
    'form.cityUuid': {
      immediate: true,
      handler: function() {
        if (this.isShow) {
          this.getCities('counties', this.form.cityUuid)
        }
      }
    },
    isShowDialog: {
      immediate: true,
      handler: function() {
        this.isShow = this.isShowDialog
        if (this.isShow) {
          this.getCities('provinces', '')
          this.getUserLists()
          if (this.storeInfo) {
            this.form = {
              id: this.storeInfo.id,
              name: this.storeInfo.name,
              provinceUuid: this.storeInfo.provinceUuid,
              cityUuid: this.storeInfo.cityUuid,
              districtUuid: this.storeInfo.districtUuid,
              address: this.storeInfo.address,
              phone: this.storeInfo.phone,
              adminID: this.storeInfo.adminID
            }
            console.log(this.storeInfo)
            this.getCities('cities', this.form.provinceUuid)
            this.getCities('counties', this.form.cityUuid)
          } else {
            this.form = {
              provinceUuid: '',
              cityUuid: '',
              districtUuid: ''
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
    dialogTitle() {
      if (this.storeInfo) {
        return `编辑门店`
      } else {
        return '新增门店'
      }
    }
  },
  mounted() {},
  methods: {
    // 获取城市
    getCities(name, uuid) {
      let query = {
        order: 'id',
        limit: '0,1000',
        parentUuid: uuid
      }
      api.getCities(query)
        .then((data) => {
          this[name] = data.datas
        })
        .catch((err) => {
          this.$message.error(err.errorMsg)
        })
    },
    getUserLists() {
      let query = {
        status: 10,
        limit: '0,1000'
      }
      api
        .getUserLists(query)
        .then((data) => {
          if (data) {
            this.admins = data.datas
          }
        })
        .catch((error) => {
          this.$message.error(error.errorMsg)
        })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          if (this.storeInfo) {
            formData.append('id', this.storeInfo.id)
          }
          formData.append('name', this.form.name)
          formData.append('provinceUuid', this.form.provinceUuid)
          formData.append('cityUuid', this.form.cityUuid)
          formData.append('districtUuid', this.form.districtUuid)
          formData.append('address', this.form.address)
          formData.append('phone', this.form.phone)
          formData.append('adminID', this.form.adminID)
          api.saveStore(formData)
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
