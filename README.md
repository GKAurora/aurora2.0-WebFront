# bisai

## 安装项目依赖
```
npm install
```

### 运行开发服务器
```
npm run serve
```

### 编译项目
```
npm run build
```


## 项目结构
```shell
.
├── README.md
├── babel.config.js
├── images
│   └── bg.jpg
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   │   ├── auth.js
│   │   ├── index.js
│   │   ├── sdn.js
│   │   ├── server.js
│   │   └── user.js
│   ├── assets
│   │   ├── css
│   │   │   └── common.scss
│   │   ├── img
│   │   │   ├── about
│   │   │   │   ├── bg.gif
│   │   │   │   ├── bisai1.jpg
│   │   │   │   ├── close.png
│   │   │   │   ├── my-logo.png
│   │   │   │   ├── open.png
│   │   │   │   ├── 拓扑.png
│   │   │   │   └── 网络安全.png
│   │   │   └── equipment
│   │   │       ├── AP.png
│   │   │       ├── Controller.png
│   │   │       ├── Firewall.png
│   │   │       ├── Server.png
│   │   │       ├── Switch.png
│   │   │       ├── Switch2.png
│   │   │       └── Yun.png
│   │   ├── lang
│   │   │   ├── en.js
│   │   │   └── zh-cn.js
│   │   └── logo.png
│   ├── axios.config.js
│   ├── components
│   │   ├── ThemePicker.vue
│   │   ├── fAnnularCard.vue
│   │   ├── fCpuRate.vue
│   │   ├── fDashboard.vue
│   │   ├── fDeviceBlock.vue
│   │   ├── fGeneralStateView.vue
│   │   ├── fMemory.vue
│   │   ├── fMessageCard.vue
│   │   ├── fRadarmap.vue
│   │   ├── fSiteSelector.vue
│   │   ├── others
│   │   │   ├── Annular.vue
│   │   │   ├── CpuRate.vue
│   │   │   ├── Dashboard.vue
│   │   │   ├── MemoryInfo.vue
│   │   │   └── RadarMap.vue
│   │   ├── timeSelector.vue
│   │   └── xiaotao
│   │       └── SiteTree.vue
│   ├── main.js
│   ├── router
│   │   ├── index.js
│   │   ├── staticRouter.js
│   │   └── whiteList.js
│   ├── store
│   │   └── index.js
│   ├── utils
│   │   ├── converter.js
│   │   └── request.js
│   └── views
│       ├── ESMap
│       │   └── esmap1.vue
│       ├── Map
│       │   ├── index.vue
│       │   └── main.vue
│       ├── account
│       │   └── AccountManagement.vue
│       ├── device
│       │   └── Devicedetails.vue
│       ├── error
│       │   ├── AppError403.vue
│       │   ├── AppError404.vue
│       │   └── AppError500.vue
│       ├── flow
│       │   └── FlowMonitoring.vue
│       ├── heatmap
│       │   ├── canvas.vue
│       │   └── index.vue
│       ├── index
│       │   └── index.vue
│       ├── layout
│       │   ├── TheLayout.vue
│       │   ├── TheLayoutEmpty.vue
│       │   ├── TheLayoutHeader.vue
│       │   ├── TheLayoutMain.vue
│       │   ├── TheLayoutSidebar.vue
│       │   ├── TheLayoutSubSidebar.vue
│       │   └── TheLayoutTags.vue
│       ├── log
│       │   ├── EquLog.vue
│       │   └── UserLog.vue
│       ├── login
│       │   ├── AppLogin.vue
│       │   └── AppRegister.vue
│       ├── pages
│       │   └── PageHome.vue
│       ├── topology
│       │   ├── Topo.vue
│       │   └── Topology.vue
│       └── user
│           ├── UserList.vue
│           └── Users.vue
├── vue.config.js
└── yarn.lock
```