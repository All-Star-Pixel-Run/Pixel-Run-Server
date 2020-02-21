const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let connectedUser = 0
let players = 0
let playerNames = []
let suits = []

io.on('connection', function (socket) {
    connectedUser++
    if (connectedUser == 0) {
        players = 0
    }
    console.log(connectedUser + ' user connected');

    socket.on('join', function (playerName) {
        players++
        playerNames.push(playerName)
        io.emit('playerJoin', players)
        // console.log(playerNames);
    })

    socket.on('startGame', function () {
        io.emit('gameStarting', playerNames)
    })

    socket.on('disconnect', function () {
        connectedUser--
        if (players > 0) {
            players--
            io.emit('playerJoin', players)
        } else {
            players = 0
            io.emit('playerJoin', players)
        }
        players = 0;
        playerNames = [];
        console.log(connectedUser + ' user connected');
    });
    socket.on('sendSuit', (suit) => {
        suits.push(suit);
    });
    socket.on("showResult", () => {
        io.emit("result", suits);
        setTimeout(() => {
            suits = [];
        }, 5000);
    });
});


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

http.listen(3000, () => {
    console.log('on port 3000')
})

// module.exports = app
