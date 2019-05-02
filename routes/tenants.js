const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const User = require("../models/User");
const Apartment = require("../models/Apartment");
const Unit = require("../models/Unit");
const WorkOrder = require("../models/WorkOrder");

const router = express.Router();

router.post("/login", (req, res, next) => {
  User.find({
    email: req.body.email
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
          var token = jwt.sign(
            {
              email: user[0].email,
              name: user[0].first_name + user[0].last_name,
              _id: user[0]._id,
              isAdmin: false
            },
            process.env.JWT_KEY,
            {
              expiresIn: process.env.token_life
            }
          );
          return res.status(200).json({
            message: "Success",
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

router.get("/workOrders", checkAuth, (req, res, next) => {
  WorkOrder.find({ creator: req._id })
    .exec()
    .then(orders => {
      return res.status(200).json({
        message: "Success",
        orders: orders
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(200).json({
        message: "Server Error"
      });
    });
});

router.get("/unit", checkAuth, (req, res, next) => {
  User.findById(req._id)
    .exec()
    .then(user => {
      Unit.findById(user.unit)
        .exec()
        .then(unit => {
          return res.status(200).json({
            unit: unit
          });
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({
            message: "Server Error"
          });
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        message: "Server Error"
      });
    });
});

router.get('/profile', checkAuth, (req, res, next) => {
  User.findById(req._id)
  .exec()
  .then(user => {
    return res.status(200).json({
      user: user
    })
  })
  .catch(err => {
    console.log(err)
    return res.status(500).json({
      message: 'Server Error'
    })
  })
})
module.exports = router;
