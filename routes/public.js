const express = require("express");
const mongoose = require("mongoose");
const Apartment = require("../models/Apartment");
const Unit = require('../models/Unit')
const router = express.Router()

router.get('/listings',(req, res, next) => {
    Apartment.find()
    .exec()
    .then(apts => {
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

router.get('/units/:id',(req, res, next) => {
    Unit.findById(req.params.id)
    .exec()
    .then(unit => {
        return res.status(200).json({
            unit: unit
        })
    })
})

module.exports = router