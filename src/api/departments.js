// 封装和组织架构有关的 API

// 导入 request
import request from '@/utils/request'

/**
 * @description 查询企业的部门列表
 * @returns Promise
 */
export function getDepartments() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

/**
 * @description 获取负责人列表
 * @returns
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

/**
 * @description 新增部门
 * @param {*} data
 * @returns
 */
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * @description 根据ID查询部门详情
 * @param {*} id 部门 ID
 * @returns
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

/**
 * @description 根据ID修改部门详情
 * @param {*} data
 * @returns
 */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
