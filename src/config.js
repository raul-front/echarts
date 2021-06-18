/*
 * @Descripttion: 配置文件
 * @Author: pujianguo
 * @Date: 2021-04-02 10:53:04
 */

// import theme from 'styles/uni.scss'

const ENV = import.meta.env.MODE

// 开发版
const development = {
  env: 'dev',
  // baseUrl: 'https://dev-api.xxx.com',
  baseUrl: 'api',
  debug: true,
}
// 测试版
const test = {
  env: 'test',
  baseUrl: 'https://test-api.xxx.com',
  debug: true,
}
// 预上线版
const pre = {
  env: 'pre',
  baseUrl: 'https://pre-api.xxx.com',
  debug: true,
}
// 正式版
const production = {
  env: 'production',
  baseUrl: 'https://api.xxx.com',
  debug: false,
}

const common = {
  envData: import.meta.env,
  defaultAvatar: '/images/avatar.png',
}

let config = {}
if (ENV === 'production') {
  config = Object.assign({}, common, production)
} else if (ENV === 'pre') {
  config = Object.assign({}, common, pre)
} else if (ENV === 'test') {
  config = Object.assign({}, common, test)
} else {
  config = Object.assign({}, common, development)
}

export default config
