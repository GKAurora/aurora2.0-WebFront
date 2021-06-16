import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import * as echarts from 'echarts'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  ColorPicker,
  Col,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Link,
  Main,
  Menu,
  MenuItem,
  Message,
  Option,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Row,
  Select,
  Submenu,
  Switch,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Tag,
  TimePicker,
  Transfer,
  Upload
} from 'element-ui'
import './assets/css/common.scss'
import VueI18n from 'vue-i18n'
import myEnLocale from './assets/lang/en'
import myZhLocale from './assets/lang/zh-cn'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
import G6 from '@antv/g6'
Vue.config.productionTip = false

// 按需引入element-ui
Vue.use(Badge)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Col)
Vue.use(ColorPicker)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Link)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Row)
Vue.use(Select)
Vue.use(Submenu)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(TimePicker)
Vue.use(Transfer)
Vue.use(Upload)
Vue.prototype.$message = Message
Vue.prototype.$echarts = echarts
// 根据环境变量决定是否引入mock，引入后端时要注释掉
if (process.env.VUE_APP_USE_MOCK || (process.env.NODE_ENV !== 'production' && !process.env.VUE_APP_BACK_END_URL)) {
  const Mock = require('./mock/index').default
  Mock.mockData()
}

/* vue-i18n */
Vue.use(VueI18n)
const messages = {
  'en': Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}
const lang = localStorage.getItem('user-language') || 'zh-cn'
const i18n = new VueI18n({
  locale: lang,
  messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

NProgress.configure({
  easing:'ease',   //动画方式
  speed:300,       //递增进度条的速度
  showSpinner:false,    //是否显示加载ico
  trickleSpeed:200,  //自动递增的间隔
  minimum:0.3    //初始化时最小的百分比
})

//路由进入前
router.beforeEach((to,from,next)=>{
  //每次切换页面，调用进度条
  NProgress.start()
  //放行
  next()
})
//路由进入后，关闭进度条
router.afterEach(()=>{
  //在即将进入新的页面组件前，关掉进度条
  NProgress.done()
})

new Vue({
  router,
  store,
  G6,
  i18n,
  render: h => h(App)
}).$mount('#app')
