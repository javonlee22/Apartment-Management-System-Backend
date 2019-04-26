const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const User = require("../models/User");

const router = express.Router();

router.post("/login", (req, res, next) => {
  User.find({
    email: req.body.email,
  })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth Failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              name: user[0].first_name + user[0].last_name,
              _id: user[0]._id,
              isAdmin: false
            },
            process.enve.JWT_KEY,
            {
              expiresIn: process.env.token_life
            }
          );
          return res.status(200).json({
            message: "Success",
            user: user[0],
            token: token
          });
        }
        return res.status(401).json({
          message: "Auth Failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Server Error"
      });
    });
});

module.exports = router;