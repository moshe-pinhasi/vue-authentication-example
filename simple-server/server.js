const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.json({type: '*/*'}))

app.get('/login', (req, res) => {
    res.send({token: "dkfelkwkfnekwkj"})
});

app.get('/admin', (req, res) => {
    res.send({authorization: req.headers['authorization'] || null})
});

app.get('/user', (req, res) => {
    const user = {
        "guid": "1f97b3aa-7ec2-418c-944b-937d79e7f361",
        "picture": "https://randomuser.me/api/portraits/men/83.jpg",
        "age": 40,
        "name": "Esperanza Middleton",
        "email": "esperanza.middleton@undefined.info",
        "phone": "+1 (824) 555-2401",
        "address": "154 Dank Court, Brewster, Mississippi, 1290",
        "about": "In amet excepteur laborum aliqua aliquip nostrud in ex aliquip esse velit esse officia ullamco. Eu fugiat anim consequat aute officia irure laboris officia nisi officia laboris quis. In minim magna est proident proident excepteur officia et irure pariatur nostrud mollit dolor. Reprehenderit labore est eiusmod esse laborum cillum. Magna duis labore fugiat duis proident."
    }

    req.headers['authorization'] ?
            res.send({user}) :
            res.status(401).send()
});

app.get('/', (req, res) => {
    res.send({messgae: "hello"})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Server listening on: ', PORT)