//import axios from 'axios'

class AuthService {
    login(user) {
        //axios.defaults.headers.common['Authorization'] = token
        return Promise.resolve({token: "flewhfjkbenbjehu83jnmdmcn82"})
    }

    logout() {
        // remove the axios default header
        // delete axios.defaults.headers.common['Authorization']
        return Promise.resolve()
    }

    setToken(token) {
        // axios.defaults.headers.common['Authorization'] = token
    }

    handleUnauthorized(cb) {
        // axios.interceptors.response.use(undefined, function (err) {
        //     return new Promise(function (resolve, reject) {
        //         if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        //             cb()
        //         }
        //         throw err;
        //     });
        // });
    }
}

export default new AuthService()