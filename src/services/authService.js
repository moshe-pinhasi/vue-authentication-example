import {HttpService} from './httpService'

const login = (user) => {
    return HttpService.get('/login', {user})
}

const logout = () => {
    return HttpService.get('/logout')
}

export default {
    login,
    logout
}