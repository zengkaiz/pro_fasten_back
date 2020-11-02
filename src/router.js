import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ './views/order/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ './views/order/index.vue')
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import(/* webpackChunkName: "orderDetail" */ './views/order/detail.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/user/index.vue')
    },
    {
      path: '/store',
      name: 'store',
      component: () => import(/* webpackChunkName: "store" */ './views/store/index.vue')
    },
    {
      path: '/class',
      name: 'class',
      component: () => import(/* webpackChunkName: "class" */ './views/product/class.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ './views/product/product.vue')
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: () => import(/* webpackChunkName: "product" */ './views/product/detail.vue')
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: () => import(/* webpackChunkName: "dynamic" */ './views/dynamic/index.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import(/* webpackChunkName: "message" */ './views/message/index.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import(/* webpackChunkName: "customer" */ './views/customer/index.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import(/* webpackChunkName: "customer" */ './views/news/index.vue')
    },
    {
      path: '/newsEdit',
      name: 'newsEdit',
      component: () => import(/* webpackChunkName: "customer" */ './views/news/editNews.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import(/* webpackChunkName: "customer" */ './views/feedback/index.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import(/* webpackChunkName: "customer" */ './views/servicesLists/index.vue')
    },
    {
      path: '/serviceDetail',
      name: 'serviceDetail',
      component: () => import(/* webpackChunkName: "serviceDetail" */ './views/servicesLists/detail.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import(/* webpackChunkName: "customer" */ './views/notice/index.vue')
    },
    {
      path: '/editNotice',
      name: 'editNotice',
      component: () => import(/* webpackChunkName: "customer" */ './views/notice/editNotice.vue')
    }
  ]
})
