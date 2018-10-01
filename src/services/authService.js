import {httpService} from './httpService'

const login = (user) => {
    return httpService.post('/login', {user})
}

const logout = () => {
    return httpService.post('/logout')
}

export default {
    login,
    logout
}