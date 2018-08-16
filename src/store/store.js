import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './authModule'
import userModule from './userModule'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user: userModule,
    auth: authModule
  },
  strict: debug,
})