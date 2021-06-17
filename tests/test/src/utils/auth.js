import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const CodeKey = 'daoyun_code'
const User = 'username'
const Id = 'userid'
const Role = 'userrole'
export function getUser() {
  return Cookies.get(User)
}

export function setUser(username) {
  return Cookies.set(User, username)
}

export function getUserRole() {
  return Cookies.get(Role)
}

export function setUserRole(userrole) {
  return Cookies.set(Role, userrole)
}

export function getUserId() {
  return Cookies.get(Id)
}

export function setUserId(userid) {
  return Cookies.set(Id, userid)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCode() {
  return Cookies.get(CodeKey)
}

export function setCode(code) {
  return Cookies.set(CodeKey, code)
}
export function removeCode() {
  return Cookies.remove(CodeKey)
}
