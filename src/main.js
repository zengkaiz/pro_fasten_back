import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login') {
    store.state.isLoginPage = false
    store
      .dispatch('getUserInfo', {})
      .then((data) => {
        store.state.userName = data.nickName
        next()
      })
      .catch((error) => {
        console.log(error + '获取用户信息失败')
        next({ path: '/login' })
      })
    if (!store.state.confLists) {
      store
        .dispatch('getConfLists', {})
        .then((data) => {
          store.state.confLists = data
          console.log(store.state.confLists)
          next()
        })
        .catch((error) => {
          console.log(error + '获取conf信息失败')
        })
    }
  } else {
    store.state.isLoginPage = true
    next()
  }
})
let app = new Vue({
  router,
  store,
  render: (h) => h(App)
})

app.$mount('#app')
