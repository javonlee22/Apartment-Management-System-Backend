const mongoose = require('mongoose')

const unitSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
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
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    unit_number: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Unit', unitSchema);