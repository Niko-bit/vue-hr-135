// 导入 Vue
import Vue from 'vue'

// 导入 svg 组件
import SvgIcon from '@/components/SvgIcon'// svg component

// 将 SvgIcon 组件注册为全局的组件
Vue.component('svg-icon', SvgIcon)

// 下面 3 句话单纯的做了解，因为他们是 webpack 代码
// 获取到当前目录下的 svg 下所有的 svg 文件
// 找到以后借助 webpack 进行解析成相关的属性，交给组件进行 svg-icon 使用
// 关于具体怎么解析的，咱们不用了解，因为 webpack 进行了大量的封装
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
