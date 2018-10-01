import {HttpService} from './httpService'

const getUser = () => {
    return HttpService.get('/user')
}

export default {
    getUser
}