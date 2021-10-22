import axios from 'axios'
import { Message } from 'element-ui'
// 引入 Vuex 模块
import store from '@/store'
// 引入 router 模块
import router from '@/router'

// 创建 axios 实例
const service = axios.create({
  // process  Node 的全局变量，提供了当前 Node.js 进程的信息
  // 项目是运行到 node 中的，能不能使用 node 中的变量 或 方法
  // process.env 属性返回一个包含用户环境信息的对象
  // VUE_APP_BASE_API 实际上是一个变量,对应的则是我们配置的项目的根域名
  // 当我们运行 npm run dev 的时候，会解析项目根目录下的 .env.development 里面的代码
  // 一句话总结：借助 node 获取到我们声明的环境变量信息，从其中读取中我们设置的环境变量
  baseURL: process.env.VUE_APP_BASE_API, // 项目的基准地址
  // baseURL: 'http://ihrm-java.itheima.net',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 请求超时，如果超过 5000 秒，axios 会自动报错
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 先获取 token
    const token = store.state.user.token

    // 判断是否存在 token，如果存在，需要设置请求头
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 判断后端返回的字段是否正确，如果为 true 说明请求成功
    if (response.data.success) {
      // 请求成功，直接将数据返回接口
      return response.data
    } else {
      // 统一进行错误的提示处理
      Message({
        message: response.data.message, // message 后端返回的错误信息
        type: 'error',
        duration: 5 * 1000
      })

      // 抛出接口的异常
      return Promise.reject(new Error(response.data.message))
    }
  },
  error => {
    // console.dir(error)
    // 判断后端返回的状态码是不是等于 约定的 10002，
    // 如果是，需要清除 token 和用户信息
    if (error.response && error.response.data && error.response.data.code === 10002) {
      // 删除用户信息 和 token
      store.dispatch('user/logout')
      // 跳转到登录页面
      router.push('/login')
      // 给用户进行提示
      return Message({
        message: '登录信息过期，请重新登录',
        type: 'error',
        duration: 5 * 1000
      })
    }

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
