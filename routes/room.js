const express = require("express");
const room = express.Router();
const Controller = require("../controllers/room");

room.get("/", Controller.getRoomList)
room.post("/", Controller.createRoom);

module.exports = room;
