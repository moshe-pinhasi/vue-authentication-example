const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const moment = require('moment')
const _ = require('lodash')
const app = express()

app.use(cors())
app.use(bodyParser.json({type: '*/*'}))
app.use(bodyParser.urlencoded({ extended: true })) 

const SECRET = 'some_secret_string'
const jwtOptions = { 
    expiresIn: '1m',
    algorithm: 'HS256' // this is the default
};

const tokenValidate = (req, res, next) => {
    // check for each route
    // switch(req.path){
    //   case '/user': {
    //     check permisstion...
    //   }
    //   https://scotch.io/tutorials/building-and-securing-a-modern-backend-api
    // }

    var decoded;
    const token = req.headers['authorization']
    
    if (!token) res.status(401).send()

    try {
        decoded = jwt.verify(token, SECRET, jwtOptions);
        const user = _.pick(decoded, ['username', 'email', 'name']);
        req.params.user = user
        next()
        return
    } 
    catch(err) {
        console.log('couldnt verify: ', err.message)
        console.log('err.expiredAt: ', moment(err.expiredAt).valueOf())
        switch (err.message) {
            case 'jwt expired':
                decoded = jwt.decode(token)
                delete decoded['exp']
                // check if refresh token is allowed
                if (moment(decoded.createdAt).add(3, 'minute').isAfter(moment())) {
                    decoded.createdAt = moment().valueOf()
                    var newToken = jwt.sign(decoded, SECRET, jwtOptions)
                    // In case of CORS requests, browsers can only access the following response headers by default:
                    // Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma
                    // If you would like your client app to be able to access other headers, you need to set the Access-Control-Expose-Headers header on the server:
                    res.set("Access-Control-Expose-Headers", "token")
                    res.set("token", newToken)

                    const user = _.pick(decoded, ['username', 'email', 'name']);
                    req.params.user = user
                    next()
                } else {
                    // refresh token is not allowed
                    res.status(401).send()
                }
                break;
            default:
                res.status(500).send(err.message)
                // next(err); // move to error handler middlewar, see express Error Handling
          }
    }
}

app.post('/login', (req, res) => {
    const {username} = req.body.user
    var user = { 
        username: username,
        email: username + '@server.com',
        name: username,
        createdAt: moment().valueOf(),
        // role: 'user', // can add the role
    };

    var token = jwt.sign(user, SECRET, jwtOptions)
    res.send({token})
});

app.get('/admin', (req, res) => {
    res.send({authorization: req.headers['authorization'] || null})
});

app.get('/user', tokenValidate, (req, res) => {
    const user = {
        ...req.params.user, 
        "guid": "1f97b3aa-7ec2-418c-944b-937d79e7f361",
        "picture": "https://randomuser.me/api/portraits/men/83.jpg",
        "age": 40,
        "phone": "+1 (824) 555-2401",
        "address": "154 Dank Court, Brewster, Mississippi, 1290",
        "about": "In amet excepteur laborum aliqua aliquip nostrud in ex aliquip esse velit esse officia ullamco. Eu fugiat anim consequat aute officia irure laboris officia nisi officia laboris quis. In minim magna est proident proident excepteur officia et irure pariatur nostrud mollit dolor. Reprehenderit labore est eiusmod esse laborum cillum. Magna duis labore fugiat duis proident."
    }

    res.send({user})
});

app.get('/', (req, res) => {
    res.send({messgae: "hello"})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Server listening on: ', PORT)