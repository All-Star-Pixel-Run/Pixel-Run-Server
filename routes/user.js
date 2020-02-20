const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user");

router.post("/", Controller.createUser);
router.patch("/room/:id", Controller.enterRoom);
router.patch("/step", Controller.endTurn);

module.exports = router;
