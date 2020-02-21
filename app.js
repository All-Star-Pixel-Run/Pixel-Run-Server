const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { Room } = require('./models')

const port = 3000

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use((req, res, next) => {
        req.io = io
        next()
    })
    .use('/', router)
    .use(errorHandler)

Room
    .findAll()
    .then(result => {
        result.forEach(el => {
            const nsp = io.of(`/${el.id}`);
            nsp.on('connection', function (socket) {
                socket.join(el.id)
                nsp.emit('join', `connected to Room ${el.id}!`);
            });
        });
    })
    .catch(err => {
        console.log(err)
    })


server.listen(port, () => {
    console.log(`Listening to Port ${port}`)
})

// module.exports = server
