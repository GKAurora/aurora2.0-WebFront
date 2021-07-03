import axios from 'axios'
import API from './api'
import router from './router'

axios.defaults.baseURL = `${API.server}`

axios.defaults.headers['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('raw', config)
  // console.log('req', localStorage.getItem('user-token'))
  if (localStorage.getItem('user-token') != null && localStorage.getItem('user-token') != '') {
    config.headers.Authorization = `${API.tokenPrefix}${localStorage.getItem('user-token')}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (config) {
  // console.log('resp', config)
  return config
}, err => {
  console.log('axios err', err.response)
  if(err.response.status >= 400 || err.response.status >= 500){
    if(err.response.status === 401){
      // 鉴权失败，跳转登录
      console.log('401! to login')
      // router.push('/login')
    }
    return err.response
  }
  return err
})

export default axios