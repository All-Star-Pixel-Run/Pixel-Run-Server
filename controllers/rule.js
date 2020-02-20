const randomRule = require("../helpers/randomRule");

class Controller {
    static getRule(req, res, next) {
        const rules = randomRule();
        res.status(200).json({ rules: rules });
    }
}

module.exports = Controller;