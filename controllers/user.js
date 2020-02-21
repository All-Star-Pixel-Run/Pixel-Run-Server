const { User } = require("../models");
const createError = require("http-errors");
const turn = require("../helpers/turn");
const randomRule = require("../helpers/randomRule");

class Controller {
	static createUser(req, res, next) {
		const username = req.body.username;
		const obj = {
			username: username,
			step: 0,
			room: null,
		}
		const where = {
			where: {
				username: username
			}
		}
		User.findOne(where)
			.then(data => {
				if (!data) {
					return User.create(obj);
				} else {
					next(createError(400, "Username already used!"));
				}
			})
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				next(createError(500, "Internal server error!"));
			})
	}

	static enterRoom(req, res, next) {
		const id = req.params.id;
		const obj = {
			room: req.body.room
		}
		const where = {
			where: {
				id: id
			}
		}

		let rule
		const nsp = req.io.of(`/${obj.room}`);

		console.log(Object.keys(nsp.clients().connected).length, "TOTAL CONNECTED")
		if (Object.keys(nsp.clients().connected).length == 2) {
			rule = randomRule()
			nsp.emit('playgame', rule)
		}

		User.update(obj, where)
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				next(createError(500, "Internal server error!"));
			});
	}
	static endTurn(req, res, next) {
		const rule = req.body.rules;
		const players = req.body.players;
		const suits = [];
		players.forEach(el => {
			suits.push(el.suit);
		});
		const score = turn(rule, suits);
		const allPromise = [];
		players.forEach((el, i) => {
			const id = el.id;
			const obj = {
				step: score[i]
			}
			console.log(obj);
			const where = {
				where: {
					id: id
				}
			}
			allPromise.push(User.update(obj, where));

		});
		Promise.all(allPromise)
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				next(createError(500, "Internal server error!"));
			});
	}

	static getAllRoom(req, res, next) {
		User
			.aggregate('room', 'DISTINCT', { plain: false })
			.then(results => {
				res.status(200).json(results)
			})
			.catch(err => {
				next(createError(500, "Internal server error!"));
			})
	}

	static getPlayeronRoom(req, res, next) {
		User
			.findAll({
				where: {
					room: req.params.roomid
				}
			})
			.then(players => {
				console.log(players, "INI PLAYERS")
				res.status(200).json(players)
			})
			.catch(err => {
				next(createError(500, "Internal server error!"));
			})
	}
}

module.exports = Controller;
