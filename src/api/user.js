import request from '@/utils/request'

// 注释这么写：为了以后方便分析项目
/**
 * @description 登录接口
 * @param {mobile, password} data number, number
 * @returns Promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserProfile() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * @description 获取员工基本信息
 * @param { id } id 当前员工的id
 * @returns Promise
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

export function logout() {}
