const jwt = require("jsonwebtoken");
const configVars = require("../config/vars.js");

module.exports = {
    isValid,
    createToken
};

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
}

function createToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
        department: user.department
    };

    const secret = configVars.jwtSecret;

    const options = {
        expiresIn: configVars.expiresIn,
    };

    return jwt.sign(payload, secret, options);
}