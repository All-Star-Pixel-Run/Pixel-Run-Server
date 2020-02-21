const { Room } = require('../models')

class RoomController {
    static createRoom(req, res, next) {
        const room = {
            name: req.body.name
        }

        Room
            .create(room)
            .then(room => {
                const nsp = req.io.of(`/${room.id}`);
                nsp.on('connection', function (socket) {
                    socket.join(room.id)
                    nsp.emit('join', `connected to Room ${room.id}!`);
                });
                req.io.emit('rooms')
                res.status(200).json(room)
            })
            .catch(next)
    }

    static getRoomList(req, res, next) {
        Room
            .findAll()
            .then(list => {
                res.status(200).json(list)
            })
            .catch(next)
    }
}

module.exports = RoomController