require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (id, admin) => {
    return jwt.sign({ id, admin }, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
    });
};

module.exports = createSecretToken