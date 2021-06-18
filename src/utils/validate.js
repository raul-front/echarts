/*
 * @Descripttion: 校验
 * @Author: pujianguo
 * @Date: 2021-04-02 13:56:26
 */

export const validatePhone = phone => {
  return /^1[34578]\d{9}$/.test(phone)
}
