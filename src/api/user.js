import { request } from '../utils/request'
import staticRouter from '@/router/staticRouter'
// import store from '@/store'

export const requestLogin = (params) => {
  return request('/api/auth/login', params).then(res => {
    localStorage.setItem('user-token', JSON.stringify(res.data.token))
    return res
  })
}

// export const requestUserInfo = () => {
//   return request('/api/user/get_user_info', {}, { 'method': 'get' }).then(res => {
//     res['permissions'] = [
//       { name: 'index' },
//       { name: 'Map' },
//       { name: 'Map1' },
//       { name: 'user' },
//       { name: 'test1' },
//       { name: 'charts' },
//       { name: 'health' },
//       { name: 'log' },
//       { name: 'account' },
//       { name: 'errorDemo403' },
//       { name: 'errorDemo404' },
//       { name: 'errorDemo500' },
//       { name: 'drag' },
//       { name: 'userPassword' },
//       { name: 'userPermissions' },
//       { name: 'about' }
//     ]
//     console.log(res)
//     console.log()
//     // 过滤菜单
//     const filterUserMenu = function (menus, accessMenu) {
//       menus.forEach(function (m) {
//         if (m.noMenu) {
//           return
//         }
//         if (m.children) {
//           let subMenu = []
//           filterUserMenu(m.children, subMenu)
//           if (subMenu.length > 0) {
//             let _aMenu = Object.assign({}, m)
//             _aMenu.children = subMenu
//             accessMenu.push(_aMenu)
//           }
//         } else {
//           res.permissions.some(p => p.name === m.name) && accessMenu.push(m)
//         }
//       })
//     }
//     let accessMenu = []
//     let menus = []
//     staticRouter.forEach(r => {
//       menus = r.menu ? menus.concat(r.children) : menus
//     })
//     filterUserMenu(menus, accessMenu)
//     res.accessMenu = accessMenu
//     return res
//   })
// }

export const requestLogout = params => {
  return request('/api/user/logout', params)
}

export const requestChangePassword = params => {
  return request('/api/user/changePassword', params)
}

export const requestUserQuery = params => {
  return request('/api/user/query', params)
}

export const requestPermissionsQuery = params => {
  return request('/api/user/permissions', params)
}
