const { Room } = require('../models')

class RoomController {
    static createRoom(req, res, next) {
        console.log('controller');
        
        const room = {
            name: req.body.name
        }
        Room
            .create(room)
            .then(room => {
                res.status(200).json(room)
            })
            .catch(err => {
                console.log(err);
                
            })
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