const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const adminAuth = require("../middleware/admin-auth");
const User = require("../models/User");
const Lease = require("../models/Lease");
const Apartment = require("../models/Apartment");
const Unit = require("../models/Unit");

const router = express.Router();

router.post("/login", (req, res, next) => {
  User.find({
    email: req.body.email,
    isAdmin: true
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
              isAdmin: true,
              _id: user[0]._id
            },
            process.env.JWT_KEY,
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

router.post("/register", (req, res, next) => {
  User.find({
    email: req.body.email
  })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        resizeBy.status(409).json({
          message: "Email Already Exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            constole.log(err);
            return res.status(500).json({
              message: "Server Error"
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              isAdmin: true,
              password: hash,
              phone_number: req.body.phone_number,
              lease: null,
              unit: null,
              birth_date: null,
              
            });
            user
              .save()
              .then(result => {
                console.log(result);
                return res.status(201).json({
                  message: "User Created"
                });
              })
              .catch(err => {
                console.log(err);
                return res.status(500).json({
                  message: "Server Error"
                });
              });
          }
        });
      }
    });
});

router.post("/create-tenant", adminAuth, (req, res, next) => {
  User.find({
    email: req.body.email
  })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        resizeBy.status(409).json({
          message: "Email Already Exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            constole.log(err);
            return res.status(500).json({
              message: "Server Error"
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              isAdmin: false,
              password: hash,
              phone_number: req.body.phone_number
              //Add lease, apartment and unit
            });
            const lease = new Lease({
              _id: new mongoose.Types.ObjectId(),
              start_date: req.body.start,
              end_date: req.body.end,
              unit: req.body.unit
            });
            user
              .save()
              .then(result => console.log(result))
              .catch(err => {
                console.log(err);
                return res.status(500).json({
                  message: "Server Error"
                });
              });
          }
        });
      }
    });
});

router.post("/add-apt", adminAuth, (req, res, next) => {
  const apt = new Apartment({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    units: null
  });
  apt
    .save()
    .then(result => {
      console.log(result);
      return res.status(201).json({
        message: "Success"
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        message: "Server Error"
      });
    });
});

router.post("/add-unit", adminAuth, (req, res, next) => {
  const unit = new Unit({
    _id: new mongoose.Types.ObjectId(),
    tenant: req.body.tenant,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    square_feet: req.body.sq_ft,
    building: req.body.apartment,
    unit_number: req.body.unit_number
  });
  unit
    .save()
    .then(result => {
      console.log(result);
      return res.status(201).json({
        message: "Success"
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        message: "Server Error"
      });
    });
});

module.exports = router;
