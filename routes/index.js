const router = require('express').Router()
const User = require("./user");
const Room = require("./room")
const Controller = require("../controllers/rule");

router.use("/users", User);
router.use("/rooms", Room)
router.get("/getRule", Controller.getRule);


module.exports = router