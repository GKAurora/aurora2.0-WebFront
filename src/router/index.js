import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import whiteList from './whiteList'
import staticRouter from './staticRouter'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: staticRouter
  // mode: 'history'
})

/* 利用router.meta保存数据级权限 */
const routerInit = (permissions) => {
  permissions.forEach(function (v) {
    let routeItem = router.match(v.name)
    if (routeItem) {
      routeItem.meta.permission = v.permission ? v.permission : []
    }
  })
}

/* 检测用户是否有权限访问页面 */
const pagePermission = (permissions, to, next) => {
  const allowPage = permissions.some(function (v) {
    return v.name === to.name
  })
  // console.log('allow', allowPage)
  // return 
  allowPage ? next() : next({ path: 'login' })
}

/* 权限控制 */
router.beforeEach((to, from, next) => {
  /* 取消旧请求 */

  const CancelToken = axios.CancelToken
  router.app.$options.store.state.source.cancel && router.app.$options.store.state.source.cancel()
  router.app.$options.store.commit('updateSource', { source: CancelToken.source() })
  const token = localStorage.getItem('user-token')
  // whiteList.indexOf(to.path) === -1 ? token != null && token != '' ? next() : next('/login') : next()
/* 进入登录页面将注销用户信息 */
  // console.log(to)
  // console.log(from)
  if (to.path === '/login') {
    router.app.$options.store.commit('deleteUser')
    localStorage.removeItem('user-token')
  }
  /* 免登录页面 */
  // console.log(to, from)
  if (whiteList.indexOf(to.path) != -1) {
    next()
    return 
  }
  if(token === null || token === ''){
    next('/login')
    return 
  }

  let permissions = router.app.$options.store.state.user.permissions
  /* 上次会话结束，重新获取用户信息 */
  if (!permissions.length) {
    /* 获取用户信息和权限 */
    router.app.$options.store.dispatch('requestUserInfo').then(() => {
      // setInterval(() => {
        permissions = router.app.$options.store.state.user.permissions || []
        routerInit(permissions)
        pagePermission(permissions, to, next) 
      // }, );
    }).catch((err) => {
      /* 获取用户信息异常 */
      console.error('router ERR', err)
      next({ path: '/login' })
    })
    
  } else {
    /* 已登录时判断页面权限 */
    pagePermission(permissions, to, next)
  }
  // console.log('Router end')
})

export default router
