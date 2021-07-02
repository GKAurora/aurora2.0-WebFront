import axios from 'axios'
import API from './api'

axios.defaults.baseURL = `${API.server}`

axios.defaults.headers['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('raw', config)
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
  console.log('resp', config)
  // if(config.status === 401){
  //   console.log('鉴权失败')
  // }
  // return config
  return config
}, err => {
  console.log('resp err↓')
  console.log(err.response)
  if(err.response.status === 401){
    console.log('鉴权失败')
    return null
  }
  return err
})

export default axios