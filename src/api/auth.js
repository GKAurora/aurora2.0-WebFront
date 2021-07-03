const auth = {
  prefix: `/auth`,
  /**
     * 用户登录接口
     * @param {string} username 用户名
     * @param {string} password 用户密码
     * @returns axios data
     */
  login (username, password) {
    return {
      url: `${this.prefix}/login`,
      method: 'post',
      data: {
        username: username,
        password: password
      }
    }
  },
  getLoginUserMsg() {
    return {
      url: `/user/get_user_info`,
      method: 'get'
    }
  },
  /**
     * 获取管理员列表
     * @returns 返回用户信息列表
     */
  getUsers () {
    return {
      url: `${this.prefix}/get`,
      method: 'get'
    }
  },
  /**
     * 用户注册（单个）
     * @param {string} username 用户名
     * @param {string} password 密码
     * @param {string} email 邮箱
     * @param {int} group 权限分组
     * @returns axios data
     */
  reg (username, password, email, group) {
    return {
      url: `${this.prefix}/reg`,
      method: 'post',
      data: [{
        email: email,
        username: username,
        password: password,
        group: group
      }]
    }
  },
  /**
     * 用户信息修改接口，通过指定参数名实现单项修改
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @param {bool} state 用户状态（是否可登录）
     * @returns
     */
  modify (email = null, password = null, state = null) {
    return {
      url: `${this.prefix}/user`,
      method: 'post',
      data: {
        email: email,
        password: password,
        state: state
      }
    }
  }

}

export default auth
