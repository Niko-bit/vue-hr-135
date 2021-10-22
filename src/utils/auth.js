// 导入 js-cookie，用来将数据存储到本地
import Cookies from 'js-cookie'

// 统一的 key
const TokenKey = 'hrsaas-ihrm-token'

// 获取 Token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置 Token
export function setToken(token) {
  // key -- 名
  // token -- 值
  return Cookies.set(TokenKey, token)
}

// 删除本地存储的 Token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
