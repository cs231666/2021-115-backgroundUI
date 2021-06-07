import request from '@/utils/request'
import da from 'element-ui/src/locale/lang/da'
import qs from 'qs'
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

export function register(data) {
  console.log('api user.js register()')
  console.log(data)
  return request({
    url: '/user/userRegister',
    method: 'post',
    data: {
      // name: data.name,
      password: data.password,
      // role: data.role,
      // sno: data.sno,
      username: data.username
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
