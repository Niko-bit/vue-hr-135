import Vue from 'vue'

// 对项目样式进行统一风格
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 导入 Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

// 导入根组件
import App from './App'
// 导入 Vuex
import store from './store'
// 导入 Vue-router
import router from './router'

import '@/icons' // icon 图标
import '@/permission' // 权限控制

/**
 * 前端和后端同时进行开发
 * 前端 1 天写好了
 * 后端 5 天写好
 * ---------------
 *
 * 使用某种方式模拟后端返回的数据，先行开发：mock
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// 对 Vue 进行实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
