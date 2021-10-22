import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserProfile, getUserDetailById } from '@/api/user'

const state = {
  token: getToken() || '', // 共享的 token
  userInfo: {} // 用户的信息
}

const mutations = {
  // 对 token 进行赋值
  setToken(state, newToken) {
    state.token = newToken
    // 将 token 持久化存储到本地
    setToken(newToken)
  },

  // 移除 token
  removeToken(state) {
    state.token = ''
    // 在调用这个方法时需要将 token 从本地移除
    removeToken()
  },

  // 给用户信息赋值
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },

  // 移除用户的信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 用户登录逻辑
  // action 方法第一个参数是 store 实例
  async userLogin(context, userInfo) {
    // 调用 API，获取 Token
    const res = await login(userInfo)
    // 调用 mutations 方法，对 token 赋值
    context.commit('setToken', res.data)
  },

  // 获取用户的信息
  async getUserInfo(context) {
    const res = await getUserProfile()
    const userInfo = await getUserDetailById(res.data.userId)
    // 获取用的基本信息
    // 将用户信息存储到 vuex 中
    context.commit('setUserInfo', { ...res.data, ...userInfo.data })
  },

  // 退出的 actions
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户信息
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

