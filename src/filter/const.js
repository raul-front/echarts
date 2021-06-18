/*
 * @Descripttion: 过滤器数据
 * @Author: pujianguo
 * @Date: 2021-04-02 14:46:34
 *
 * 通过filter()方法转换
 * eg: filter(0, 'cardType'), 结果为身份证
 */

// 性别
export const sex = {
  0: '未知',
  1: '男',
  default: '保密',
}

// 证件类型
export const cardTypeData = {
  0: '身份证',
  1: '护照',
  2: '军人身份证',
  6: '社会保障卡',
  A: '武装警察身份证',
  B: '港澳通行证',
  C: '台湾居民来往大陆通行证',
  E: '户口簿',
  F: '临时身份证',
  P: '外国人永久居留证',
  default: '',
}
