const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    // Register Details Required
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

    // About Details Optional
    avatar: {type: String, default: null},
    about: {type: String, default: null},
    job: {type: String, default: null},
    company: {type: String, default: null},
    country: {type: String, default: null},
    address: {type: String, default: null},
    phone: {type: Number, default: null},
    twitter: {type: String, default: null},
    instagram : {type: String, default: null},
    facebook : {type: String, default: null},
    linkedin  : {type: String, default: null},
});

const authModel = mongoose.model('admins', authSchema);

module.exports = authModel;