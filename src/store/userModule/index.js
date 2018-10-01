import userService from '../../services/userService'

import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from './actions'
import {AUTH_LOGOUT} from '../authModule/actions'

const USER_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}

const state = {
    user: {},
    status: ''
}

const getters = {
    user: state => state.user,
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = USER_STATUS.LOADING
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = USER_STATUS.SUCCESS
    state.user = resp.user
  },
  [USER_ERROR]: (state) => {
    state.status = USER_STATUS.ERROR
  },
  [AUTH_LOGOUT]: (state) => {
    state.user = {}
  }
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {
    commit(USER_REQUEST)

    return userService
              .getUser()
              .then(resp => commit(USER_SUCCESS, resp))
              .catch(err => {
                commit(USER_ERROR)
                dispatch(AUTH_LOGOUT) // if resp is unauthorized, logout, to
                return Promise.reject(err)
              })
  }
}

  export default {
    state,
    getters,
    actions,
    mutations,
  }
