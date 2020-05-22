const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('express').Router();

const Users = require("./auth-model");
const { isValid, createToken } = require("./auth-services");
const configVars = require("../config/vars.js");

router.get("/", (req, res) => {
  Users.find()
   .then(user => {
     res.status(201).json({ data: user });
   })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/register', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = configVars.bcryptRounds;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // saving the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide a username and password.",
    });
  }});

  router.post('/login', (req, res) => {
    const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          // produce (sign) and send the token with username and password
          const token = createToken(user);

          res.status(200).json({
            message: "Access granted.",
            token
          });
        } else {
          res.status(401).json({ message: "Invalid credentials." });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide a username and password.",
    });
  }});
  
module.exports = router;
