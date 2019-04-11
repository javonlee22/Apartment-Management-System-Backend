const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const tenantSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    first_name: {
        type: String,
        required:true
    },
    last_name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    birth_date: {
        type: Number,
        required:true
    },
    phone_number: {
        type: String,
        required: true,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    lease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lease'
    }
})
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Tenant', tenantSchema);
