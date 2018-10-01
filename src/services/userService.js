import {httpService} from './httpService'

const getUser = () => {
    return httpService.get('/user')
}

export default {
    getUser
}