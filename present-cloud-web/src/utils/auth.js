import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const CodeKey = 'daoyun_code'
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
