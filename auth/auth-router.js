const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/model.js");
const secrets = require("../api/secrets.js");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.add(user)
       .then(reg => {
         res.status(201).json(reg)
       })
       .catch(error => {
         console.log(error);
         res.status(500).json({ errorMessage: error.message });
       })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
       .then(([user]) => {
         console.log(user)
         if (user && bcrypt.compareSync(password, user.password)) {
           const token = generateToken(user);
           res.status(200).json({ message: "Welcome Back", token });
         } else {
           res.status(401).json({ message: "Username or Password incorrect" })
         }
       })
       .catch(error => {
         console.log(error);
         res.status(500).json({ message: "You shall not pass!" });
       })
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
