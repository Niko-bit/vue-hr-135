/* Layout */
import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      // 只要把 path 设置为空，就理解为当前嵌套路由默认展示的路由
      path: '',
      name: 'departments',
      component: () => import('@/views/departments/index'),
      // 元信息，就是自定义的一些路由属性
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
