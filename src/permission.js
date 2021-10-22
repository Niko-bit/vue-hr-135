// 导入路由模块
import router from './router'
import store from './store'
// 导入设置标题的方法
import getPageTitle from '@/utils/get-page-title'

// 导入进度条以及样式
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 路由白名单
const whiteList = ['/login', '/404']

// 创建前置的路由守卫
router.beforeEach(async(to, from, next) => {
  // 对当前页面的标题进行设置
  document.title = getPageTitle(to.meta.title)

  // 获取 token
  const token = store.state.user.token

  NProgress.start()

  // 判断 token 是否存在
  if (token) {
    // 是否是登录
    if (to.path === '/login') {
      next('/')
    } else {
      // 获取用户信息的时机
      // 1. 需要有 token
      // 2. 需要在跳转到页面之前
      await store.dispatch('user/getUserInfo')
      next()
    }
  } else {
    // 判断访问的路由在不在白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }

  // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
  NProgress.done()
})

// 前置守卫是可以写多个的
// router.beforeEach((to, from, next) => {
//   // 对当前页面的标题进行设置
//   document.title = getPageTitle(to.meta.title)
//   next()
// })

router.afterEach(() => {
  NProgress.done()
})

// import router from './router'
// import store from './store'
// // 从 element 中导入 Message 组件
// import { Message } from 'element-ui'

// // 导入进度条以及样式
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style

// // 导入获取 Token 的方法
// import { getToken } from '@/utils/auth' // get token from cookie
// // 处理页面的标题
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// // 白名单
// const whiteList = ['/login'] // no redirect whitelist

// // 前置路由守卫
// // to: 去哪儿
// // from: 从哪来
// // next：放行
// router.beforeEach(async(to, from, next) => {
//   // 开始显示进度条
//   NProgress.start()

//   // 设置页面的标题
//   document.title = getPageTitle(to.meta.title)

//   // 获取存储的 Token
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // 如果登录了，访问的又是登录，就跳转到主页
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       // 隐藏进度条
//       NProgress.done()
//     } else {
//       // 获取用户信息
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // 如果没有用户信息，需要线性表获取用户信息
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // 如果没有用户信息，尝试获取还获取不到，就删除 token，同时跳转到登录页面
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // 查看用户访问的页面在不在白名单中，如果在，执行放行
//       next()
//     } else {
//       // 如果没有 token，访问的页面又不在白名单，就需要用户去登录
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// // 后置守卫
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
