module.exports = {
    jwtSecret: process.env.JWT_SECRET || "48920ngbuiqzrt76lmn0145dgemcuia",
    bcryptRounds: process.env.BCRYPT_ROUNDS || 8,
    expiresIn: process.env.TOKEN_EXPIRATION || '1d'
}