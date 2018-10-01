import storageService from '../../services/storageService'
import authService from '../../services/authService'

import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from './actions'
import {USER_REQUEST} from '../userModule/actions'

const USER_TOKEN = 'token'

const AUTH_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}

const TOKEN = storageService.get(USER_TOKEN) || ''

const state = {
    token: TOKEN,
    status: null,
}

const getters = {
    token: state => state.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = AUTH_STATUS.LOADING
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = AUTH_STATUS.SUCCESS
        state.token = token
    },
    [AUTH_ERROR]: (state) => {
        state.status = AUTH_STATUS.ERROR
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
        state.status = null
    },
}

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        commit(AUTH_REQUEST)

        return authService.login(user)
            .then(resp => {
                const token = resp.token
                storageService.save(USER_TOKEN, token)
                commit(AUTH_SUCCESS, token)
                // you have your token, now log in your user
                return dispatch(USER_REQUEST)
            })
            .catch(err => {
                commit(AUTH_ERROR, err)
                storageService.remove(USER_TOKEN) // if the request fails, remove any possible user token if possible
                return Promise.reject(err)
            })
    },
    [AUTH_LOGOUT]: ({commit}) => {
        commit(AUTH_LOGOUT)
        storageService.remove(USER_TOKEN) // clear your user's token from localstorage
        return Promise.resolve()
    }
    
  }

  export default {
    state,
    getters,
    actions,
    mutations,
  }
