import {HttpService} from './httpService'

class UserService {
    getUser() {
        return HttpService.get('/user')
    }
}

export default new UserService()