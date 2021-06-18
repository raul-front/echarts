/*
 * @Descripttion: 使用示例
 * @Author: pujianguo
 * @Date: 2021-04-02 17:17:14
 */
import { _get, _post, _put, _delete } from 'utils/request'

// eg: task
export const listTask = query => _get('/oa/task', query)
export const addTask = body => _post('/oa/task', body)
export const updateTask = (id, body) => _put(`/oa/task/${id}`, body)
export const deleteTask = id => _delete(`/oa/task/${id}`)
