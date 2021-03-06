import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
// 导入全剧样式
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

// 富文本编辑器导入
import VueQuillEditor from 'vue-quill-editor'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 富文本编辑器样式导入
// eslint-disable-next-line import/first
import 'quill/dist/quill.core.css' // import styles

// 导入进度条插件
// eslint-disable-next-line import/first
import NProgress from 'nprogress'
// 导入进度条样式
// eslint-disable-next-line import/first
import 'nprogress/nprogress.css'

// eslint-disable-next-line import/first
import axios from 'axios'

// 引入mock数据
import './mock/index'

import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use(ElementUI)

Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://localhost:5000/'

// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  // 当进入request拦截器，表示发送了请求，我们就开启进度条
  NProgress.start()
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须返回config
  return config
})
// 在response拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  // 当进入response拦截器，表示请求已经结束，我们就结束进度条
  NProgress.done()
  return config
})

Vue.config.productionTip = false
// Vue.use(ElementUi)

Vue.component('tree-table', TreeTable)
// 富文本编辑器注册为全局可用
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
