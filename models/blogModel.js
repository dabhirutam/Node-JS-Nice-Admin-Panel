const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    blog: {type: String, required: true},
    autherId: {type: String, required: true},
    blogImg: {type: String, required: true},
}, {timestamps:true});

const blogModel = mongoose.model('blogs', blogSchema);

module.exports = blogModel;