const mongoose = require('mongoose')

const leaseSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    start_date: {
        type: Number,
        required: true
    },
    end_date: {
        type: Number,
        required: true
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    }
})

module.exports = mongoose.model('Lease', leaseSchema);