const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// -------------- register new user --------------
router.post("/register", (req, res) => {

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    // the role is constent for all users
    role: 'user' ,
    image : 'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png'
  };

  newUser.email = newUser.email.toLowerCase();
  User.findOne({ email: newUser.email })
    .then((user) => {
      // if the email is already exist
      if (user) {
        res.json({
          msg: "The email is already exist! ",
        });
      }

      // if the email is not exist
      else {
        var salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(req.body.password, salt);
        newUser.email = newUser.email.toLowerCase();
        User.create(newUser).then((user) => {
          res.json({ msg: "user hasbeen register", user: user });
        });
      }
    })
    .catch((err) => res.json({ msg: err }));
});

// -------------- login for both users and admin --------------
router.post("/login", async (req, res) => {

  let { email, password } = req.body;
  const user = await User.findOne({ email: email }); 

  // if user is not exist
  if (!user) {
    res.json({ msg: "email is not exist" });
  }
  // if user is exist
  else {
    // if password is correct
    if (bcrypt.compareSync(password, user.password)) {
      user.password = undefined;
      let payload = { user };
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 1000 * 60 * 60,
      }); // to the user info

      if ( user.role == 'admin')
      {
        res.json({ msg: "admin login ", token });
        // TODO: redirct to dashboard
      }
      else 
      {
        res.json({ msg: "user login ", token });
        // TODO: redirct to user profile
      }
    }
    // if password is not currect
    else {
      res.json({ msg: "password is not correct" });
    }
  }
});

// -------------- token --------------
router.get("/:token", (req, res) => {

  let token = req.params.token;

  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) return res.json({ msg: err });
    let user = decode;
    res.json({ msg: "user decoded", user });
  });

});
module.exports = router;