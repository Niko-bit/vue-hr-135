const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.user.userInfo.username, // 用户名
  staffPhoto: state => state.user.userInfo.staffPhoto // 用户头像
}
export default getters
