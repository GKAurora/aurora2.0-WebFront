import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import whiteList from './whiteList'
import staticRouter from './staticRouter'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: staticRouter,
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
  allowPage ? next() : next({ path: '/error/403' })
}

/* 权限控制 */
router.beforeEach((to, from, next) => {
  /* 取消旧请求 */

  const CancelToken = axios.CancelToken
  router.app.$options.store.state.source.cancel && router.app.$options.store.state.source.cancel()
  router.app.$options.store.commit('updateSource', { source: CancelToken.source() })
  const token = localStorage.getItem('user-token')
  console.log('router', token)
  console.log(to, from)
  whiteList.indexOf(to.path) === -1 ? token != null && token != '' ? next() : next('/login') : next()

  // if (to.path === '/login') {
  //   next()
  // } else if (to.path === '/index') {
  //   if (token === null || token === '') {
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
})

export default router
