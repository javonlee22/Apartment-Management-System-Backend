const mongoose = require('mongoose')

const workOrderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('WorkOrder', workOrderSchema);