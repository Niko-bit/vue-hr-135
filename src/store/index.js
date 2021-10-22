// 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 导入 getters
import getters from './getters'

// 导入拆分的模块
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

// 将 Vuex 挂载为 Vue 的插件
Vue.use(Vuex)

// 对 Vuex 进行实例化
const store = new Vuex.Store({
  // 挂载拆分的模块
  modules: {
    app,
    settings,
    user
  },
  // 框架作者之所以没有将 getters 放到单独模块中
  // 就是为了获取数据方便，程序员可以直接通过 getters.xxx 直接获取数据
  // 不需要在跟上模块名
  getters
  // getters: {
  //   // test: function(state) {
  //   //   return state.xxx
  //   // }
  //   test: state => state.xxx
  // }
})

export default store
