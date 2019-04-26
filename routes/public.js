const express = require("express");
const mongoose = require("mongoose");
const Apartment = require("../models/Apartment");

const router = express.Router()

router.get('/listings',(req, res, next) => {
    Apartment.find()
    .exec()
    .then(apts => {
        console.log(apts)
        return res.status(200).json({
            apts: apts
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: 'Server Error'
        })
    })
})

module.exports = router