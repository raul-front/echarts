import { _get, _post, _put, _delete } from 'utils/request'

// 用户管理
export const listUser = query => _get('/users/page', query)
export const getUser = id => _get(`/users/${id}`)
export const addUser = body => _post('/users', body)
export const updateUser = (id, body) => _put(`/users/${id}`, body)
export const deleteUser = id => _delete(`/users/${id}`)
