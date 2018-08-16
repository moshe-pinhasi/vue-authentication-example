import {HttpService} from './httpService'

class AuthService {
    login(user) {
        return HttpService.get('/login', {user})
    }

    logout() {
        return HttpService.get('/logout')
    }
}

export default new AuthService()