import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  state: {
    // 存储token
    Authorization: window.localStorage.getItem('Authorization') ? window.localStorage.getItem('Authorization') : ''
  },
  mutations: {
    // 修改token，并存入localstorage
    loginChange(state, user) {
      state.Authorization = user.Authorization
      window.localStorage.setItem('Authorization', state.Authorization)
    }
  },
  getters
})

export default store
