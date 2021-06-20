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
        menu: true,
        name: 'index',
        // meta:{
        //   //title:'设备管理',
        //   tree:4
        // },
        title: 'menu.equipment',
        icon: 'el-icon-s-home',
        // component: () => import('../G6/test')
        component: () => import('../views/index/index'),
        children: [
          {
            path: '/',
            name: 'index',
            meta: {
              title: '设备概览'
            },
            title: 'menu.overview',
            icon: 'el-icon-s-platform'
            // component:() => import('../views/index/test')
          }, {
            path: '/test1',
            name: 'test1',
            meta: {
              title: '流量分析'
            },
            title: 'menu.flow',
            icon: 'el-icon-s-platform'
            // component:() => import('../views/index/test')
          }
          , {
            path: '/test2',
            name: 'index',
            meta: {
              title: '设备详情'
            },
            title: 'menu.details',
            icon: 'el-icon-s-platform'
            // component:() => import('../views/index/test')
          }
        ]
      },{
        path: '/map',
        name: 'Map',
        meta: {
          title: '位置地图'
        },
        title: 'menu.map',
        icon: 'el-icon-location',
        component: () => import('../views/Map/main')
      } ,{
        path: '/Log',
        name: 'index',
        meta: {
          title: '日志分析'
        },
        title: 'menu.log',
        icon: 'el-icon-notebook-2',
        component: () => import('../views/index/index')
      },{
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理'
        },
        title: 'menu.user',
        icon: 'el-icon-s-custom',
        component: () => import('../views/user/Userstest')
      }, 
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
