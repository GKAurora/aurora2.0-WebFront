import staticRouter from '@/router/staticRouter'
import axios from '../axios.config'

export const requestUserInfo = () => {
  return axios({ 'method': 'get', 'url': '/user/get_user_info' }).then((res) => {
    res['permissions'] = [
      { name: 'index' },
      { name: 'Map' },
      { name: 'Map1' },
      { name: 'user' },
      { name: 'test1' },
      { name: 'charts' },
      { name: 'health' },
      { name: 'log' },
      { name: 'account' },
      { name: 'errorDemo403' },
      { name: 'errorDemo404' },
      { name: 'errorDemo500' },
      { name: 'drag' },
      { name: 'userPassword' },
      { name: 'userPermissions' },
      { name: 'about' }
    ]
    console.log(res)
    // 过滤菜单
    const filterUserMenu = function (menus, accessMenu) {
      menus.forEach(function (m) {
        if (m.noMenu) {
          return
        }
        if (m.children) {
          let subMenu = []
          filterUserMenu(m.children, subMenu)
          if (subMenu.length > 0) {
            let _aMenu = Object.assign({}, m)
            _aMenu.children = subMenu
            accessMenu.push(_aMenu)
          }
        } else {
          res.permissions.some(p => p.name === m.name) && accessMenu.push(m)
        }
      })
    }
    let accessMenu = []
    let menus = []
    staticRouter.forEach(r => {
      menus = r.menu ? menus.concat(r.children) : menus
    })
    filterUserMenu(menus, accessMenu)
    res.accessMenu = accessMenu
    return res
  })
}