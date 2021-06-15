/* 静态页面路由 */
const staticRouter = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/AppLogin')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/AppRegister')
  },
  {
    path: '/',
    menu: true,
    name: 'layout',
    component: () => import('@/views/layout/TheLayout'),
    children: [
      {
        path: '/index',
        name: 'index',
        title: 'menu.home',
        icon: 'el-icon-s-home',
        // component: () => import('../G6/test')
        component: () => import('../views/pages/PageHome')
      },{
        path:'/test',
        name:'index',
        title:'menu.test',
        icon:'el-icon-loading',
        component:() => import('../views/index/test')
      }
    ]
  },
  {
    path: '/error/403',
    name: 'error403',
    component: () => import('@/views/error/AppError403')
  }, {
    path: '/error/500',
    name: 'error500',
    component: () => import('@/views/error/AppError500')
  }, {
    path: '*',
    name: 'error404',
    component: () => import('@/views/error/AppError404')
  }
]

export default staticRouter
