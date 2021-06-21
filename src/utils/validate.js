/*
 * @Descripttion: 校验
 * @Author: pujianguo
 * @Date: 2021-04-02 13:56:26
 */

/** ***********************************  正则表达式  *********************************** **/
export const regExpPhone = /^1[34578]\d{9}$/
export const regExpEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

/** ***********************************  正则校验  *********************************** **/
export const validatePhone = function (value) {
  return regExpPhone.test(value)
}
export const validateEmail = function (value) {
  return regExpEmail.test(value)
}

/** ***********************************  form表单validator  *********************************** **/
// 姓名校验 由n位汉字组成, 错误信息在message中定义 （message中的提示会覆盖Error中的提示）
export const validateFormChineseLength = (min = 2, max = 10) => (rule, value, callback) => {
  const reg = new RegExp(`^[\u4e00-\u9fa5]{${min},${max}}$`)
  if (!reg.test(value)) {
    callback(new Error())
    return
  }
  callback()
}
