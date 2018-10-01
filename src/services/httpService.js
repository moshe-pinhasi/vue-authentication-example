import axios from 'axios'
import store from '@/store/store'
import router from '@/router'
import {AUTH_LOGOUT, UPDATE_TOKEN} from '@/store/authModule/actions'

const HTTP = axios.create({
    baseURL: 'http://localhost:3000',
});

const get = (route, params) => {
    return HTTP.get(route, {params}).then(res => res.data)
    // axios.defaults.headers.common['Authorization'] = token
}

const post = (route, params) => {
    return HTTP.post(route, params).then(res => res.data)
}

// Add a request interceptor
HTTP.interceptors.request.use((config) => {

    // Do something before request is sent
    const token = store.getters.token
    if (token) {
        config.headers['Authorization'] = token;
    }
    
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
HTTP.interceptors.response.use((response) => {
    if (response.headers.token) {
        store.dispatch(UPDATE_TOKEN, response.headers.token)
    }

    return response
}, (error) => {
    // Do something with response error
    if (error.response.status === 401) {
        store.dispatch(AUTH_LOGOUT).then(() => {
            router.push('/login')
        })
    }

    return Promise.reject(error);
  });

export const httpService = {
    get,
    post
}