/*
 * @Descripttion: 接口请求方法定义
 * @Author: pujianguo
 * @Date: 2021-04-02 09:41:47
 */

import axios from 'axios'
// import store from 'store'
import config from '@/config'
import storage from 'utils/storage'
import { ElNotification } from 'element-plus'

const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 不需要验证token的接口白名单
const noAuthWhiteList = [
  'account/login',
]

// 请求拦截器
request.interceptors.request.use(config => {
  // console.log('store', store.state.user.token)
  const token = 'xxx'
  if (token) {
    config.headers.Token = token
  } else {
    const url = config.url || ''
    if (!noAuthWhiteList.includes(url)) {
      toLogin()
      return Promise.reject(new Error('not login'))
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  return response.data
}, error => {
  let msg = ''
  if (error.response) {
    if (error.response.status === 401) { // 未登陆
      toLogin()
      return
    }
    if (error.response.data && error.response.data.message) {
      msg = error.response.data.message
    } else {
      msg = error.response.data
    }
  } else {
    msg = error.message
  }
  if (msg !== 'not login') {
    // 这里统一做错误提示，如果要单独处理，跳过这里即可
    ElNotification.error({ title: '错误提示', message: msg })
  }
  console.log('api response error: ', msg)
  return Promise.reject(msg)
})

export const toLogin = () => {
  ElNotification.error({ title: '错误提示', message: '登录信息已过期，请重新登录' })
  storage.rmToken()
  window.location.href = '/#/login'
}

export const _get = (url, query) => {
  return request.get(url, { params: query })
}
export const _download = (url, query) => {
  return request.get(url, { params: query, responseType: 'blob' })
}

export const _post = (url, body) => {
  return request.post(url, body)
}

export const _upload = (url, body, config) => {
  return request.post(url, body, config)
}

export const _patch = (url, body) => {
  return request.patch(url, body)
}

export const _put = (url, body) => {
  return request.put(url, body)
}

export const _delete = (url) => {
  return request.delete(url)
}
