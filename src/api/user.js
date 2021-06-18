import { _get, _post, _put, _delete } from 'utils/request'

// 用户管理
export const listUser = query => _get('/oa/user', query)
export const addUser = body => _post('/oa/user', body)
export const updateUser = (id, body) => _put(`/oa/user/${id}`, body)
export const deleteUser = id => _delete(`/oa/user/${id}`)
