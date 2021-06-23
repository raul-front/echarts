/*
 * @Descripttion: 格式化方法
 * @Author: pujianguo
 * @Date: 2021-04-02 14:46:40
 *
 * 通过format()方法转换
 * eg: format(new Date(), 'date'), 结果为当前日期
 */
import dayjs from 'dayjs'

export default {
  // 提交时，转换后端时间
  submitTime (t) {
    t = t || new Date()
    return dayjs(t).format()
  },
  // 初始化时，转换组件需要的时间
  componentTime (t) {
    t = t || new Date()
    return (new Date(t)).getTime()
  },
}
