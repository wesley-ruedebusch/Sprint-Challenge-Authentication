module.exports = {
    jwtSecret: process.env.JWT_SECRET || "jik3453hwto87687wy45h2345l23kjhsdfgdsfgosd897y",
    bcryptRounds: process.env.BCRYPT_ROUNDS || 8,
    expiresIn: process.env.TOKEN_EXPIRATION || '1d'
}