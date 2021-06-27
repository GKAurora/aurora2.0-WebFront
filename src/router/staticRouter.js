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
        meta: {
          title: '设备概览'
        },
        title: 'menu.overview',
        icon: 'el-icon-s-platform',
        component:() => import('../views/index/index')
      }, {
        path: '/test1',
        name: 'index',
        meta: {
          title: '流量监控'
        },
        title: 'menu.flow',
        icon: 'el-icon-odometer',
        component:() => import('../views/device/Devicedetails')
      }
      , {
        path: '/test2',
        name: 'index',
        meta: {
          title: '设备详情'
        },
        title: 'menu.details',
        icon: 'el-icon-mobile-phone',
        component:() => import('../views/flow/FlowMonitoring')
      },
      {
        path: '/topology',
        name: 'Map',
        meta: {
          title: '网络拓扑'
        },
        title: 'menu.topology',
        icon: 'el-icon-share',
        component: () => import('../views/topology/Topo')
      }, {
        path: '/map',
        name: 'Map',
        meta: {
          title: '位置地图'
        },
        title: 'menu.map',
        icon: 'el-icon-location',
        component: () => import('../views/ESMap/esmap1')
      }, {
        path: '/Log',
        name: 'index',
        meta: {
          title: '日志分析'
        },
        title: 'menu.log',
        icon: 'el-icon-notebook-2',
        // component: () => import('../views/log/EquLog')
        component:() => import('../views/index/AccessSuccess/AccessSuccess_line')
      },{
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理'
        },
        title: 'menu.user',
        icon: 'el-icon-s-custom',
        component: () => import('../views/user/Userstest')
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
