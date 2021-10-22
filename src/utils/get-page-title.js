// 导入项目设置模块
import defaultSettings from '@/settings'

// 获取到项目的标题，如果没有设置，就取默认的
const title = defaultSettings.title || 'Vue Admin Template'

// 导出一个方法，
export default function getPageTitle(pageTitle) {
  // 如果传递了 pageTitle，就返回 页面标题 + 项目的名称
  if (pageTitle) {
    return `${title} - ${pageTitle} `
  }
  return `${title}`
}
