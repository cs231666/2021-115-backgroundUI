import request from '@/utils/request'
import da from 'element-ui/src/locale/lang/da'

export function login(data) {
  return request({
    url: '/user/userLogin',
    method: 'get',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
