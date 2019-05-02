const mongoose = require('mongoose')

const unitSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms:{
        type: Number,
        required: true
    },
    square_feet: {
        type: Number,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    unit_number: {
        type: String,
        required: true
    },
    url:{type: String}
})

module.exports = mongoose.model('Unit', unitSchema);