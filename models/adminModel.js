const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    // Register Details Required
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

    // About Details Optional
    avatar: {type: String},
    about: {type: String},
    job: {type: String},
    company: {type: String},
    country: {type: String},
    address: {type: String},
    phone: {type: Number},
    twitter: {type: String},
    instagram : {type: String},
    facebook : {type: String},
    linkedin  : {type: String},
});

const adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;