import axios from 'axios'
import API from './api'

axios.defaults.baseURL = `${API.server}`

axios.defaults.headers['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.getItem('user-token') != null) {
    config.headers.Authorization = `${apiConfig.token_prefix}${localStorage.getItem('user-token')}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (config) {
  console.log(config)
  return config
}, err => {
  return err
})

export default axios