import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken, setCode, getCode} from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.data.token)
        setToken(data.data.token)
        setCode(data.code)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, userInfo) {
    // const name = userInfo.name.trim()
    // const role = userInfo.role.trim()
    // const sno = userInfo.sno.trim()
    // const username = userInfo.username.trim()
    // const password = userInfo.password.trim()
    // const { name, role, sno, username, password } = userInfo
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      console.log('modules userinfo' + userInfo.password)
      register(userInfo).then(response => {
        const { data } = response
        console.log('modules userjs register' + data)
        // commit('SET_TOKEN', data.data.token)
        // setToken(data.data.token)
        setCode('modules userjs register code' + data.code)
        resolve(response)
      }).catch(error => {
        // console.log('modules userjs register ' + getCode())
        console.log('modules userjs register catch')
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    console.log('modules userjs geitinfo')
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

