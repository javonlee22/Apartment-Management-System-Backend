const mongoose = require('mongoose')

const unitSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    tenant: {
        type: mongoose.Types.Schema.ObjectId,
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
        type: mongoose.Types.Schema.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Unit', unitSchema);