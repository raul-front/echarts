import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users, getUserId } from './data/user'
let _Users = Users

// let checkPageCurrentDelete = function (num) {
//   let oldPage = Math.ceil(this.listPage.total / this.listPage.size)
//   this.listPage.total -= num
//   let newPage = Math.ceil(this.listPage.total / this.listPage.size)
//   if (oldPage !== newPage && newPage < this.listPage.current) {
//     this.changePage(newPage)
//   } else {
//     this.refresh()
//   }
// }

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    const mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success',
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure',
    })

    // 登录
    mock.onPost('/login').reply(config => {
      const { username, password } = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          const hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }])
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }])
          }
        }, 1000)
      })
    })

    // 获取用户信息
    mock.onGet(/\/users\/\d+/).reply(config => {
      const id = config.url.split('/users/')[1]
      const user = _Users.find(u => u.id === id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: user,
          }])
        }, 1000)
      })
    })

    // 获取用户列表
    mock.onGet('/users').reply(config => {
      const mockUsers = _Users.filter(user => {
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            items: mockUsers,
          }])
          // resolve([300, {
          //   message: '参数错误'
          // }]);
        }, 1000)
      })
    })

    // 获取用户列表（分页）
    // mock.onGet('/users/page').reply(config => {
    //   let { size, current } = config.params
    //   let mockUsers = JSON.parse(JSON.stringify(_Users))
    //   let total = mockUsers.length
    //   let pageCount = Math.ceil(total / size)
    //   if (current > pageCount) {
    //     current = pageCount
    //   }
    //   mockUsers = mockUsers.filter((u, index) => index < size * current && index >= size * (current - 1))
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         current: current,
    //         total: total,
    //         items: mockUsers
    //       }])
    //     }, 1000)
    //   })
    // })
    mock.onGet('/users/page').reply(config => {
      let { limit, offset } = config.params
      limit = Number(limit)
      offset = Number(offset)
      let mockUsers = JSON.parse(JSON.stringify(_Users))
      const total = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < offset + limit && index >= offset)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            items: mockUsers,
          }])
        }, 1000)
      })
    })

    // 删除用户
    mock.onDelete(/\/users\/\d+/).reply(config => {
      const id = config.url.split('/users/')[1]
      _Users = _Users.filter(u => u.id !== id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功',
          }])
        }, 500)
      })
    })

    // 批量删除用户
    mock.onGet('/users/batchremove').reply(config => {
      let { ids } = config.params
      ids = ids.split(',')
      _Users = _Users.filter(u => !ids.includes(u.id))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功',
          }])
        }, 500)
      })
    })

    // 编辑用户
    mock.onPatch(/\/users\/\d+/).reply(config => {
      const id = config.url.split('/users/')[1]
      const { name, addr, age, birth, sex } = JSON.parse(config.data)
      _Users.some(u => {
        if (u.id === id) {
          u.name = name
          u.addr = addr
          u.age = age
          u.birth = birth
          u.sex = sex
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功',
          }])
        }, 500)
      })
    })

    // 新增用户
    mock.onPost('/users').reply(config => {
      const data = JSON.parse(config.data)
      data.id = getUserId()
      _Users.push(data)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功',
          }])
        }, 500)
      })
    })
  },
}
