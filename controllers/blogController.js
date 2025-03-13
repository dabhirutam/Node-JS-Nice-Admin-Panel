const authModel = require("../models/authModel");
const blogModel = require("../models/blogModel");
const fs = require('fs')

const AddBlog = (req, res) => {
    res.render('addBlog');
};

const SaveBlog = async (req, res) => {

    try {
        const { title, blog } = req.body;

        const newBlog = await new blogModel({
            title,
            blog,
            blogImg: req.file.path,
            autherId: req.user._id
        });

        await newBlog.save();
        console.log("Blog is Created...");

        res.redirect('/viewBlog');
    } catch (err) {
        console.log("ERR", err);
    }
};

const ViewBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find();

        const attechAdminBlogs = await blogs.map(async (blog) => {
            const admin = await authModel.findById(blog.autherId);

            return { ...blog.toObject(), admin };
        });

        const adminBlog = await Promise.all(attechAdminBlogs);        

        res.render('viewBlog', { adminBlog });
    } catch (err) {
        console.log("ERR", err);
    }
};

const MyBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find({ autherId: req.user._id });

        res.render('myBlog', { blogs });
    } catch (err) {
        console.log("ERR", err);
    }
};

const EditBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params._id);

        res.render('editBlog', { blog });
    } catch (err) {
        console.log("ERR", err);
    }
};

const UpdateBlog = async (req, res) => {
    try {
        let updatedBlog;

        if (req.file) {
            fs.unlinkSync(req.body.oldImg);
            updatedBlog = { ...req.body, blogImg: req.file.path };
        } else updatedBlog = req.body;

        await blogModel.findByIdAndUpdate(req.body._id, updatedBlog);

        res.redirect('myBlog');
    } catch (err) {
        console.log("ERR", err);
    }
};

const DeleteBlog = async (req, res) => {
    try{
        const blog = await blogModel.findById(req.params._id);

        fs.unlink(blog.blogImg, () => console.log("Blog is Deleted"));
        await blogModel.findByIdAndDelete(req.params._id);
        res.redirect('/myBlog');
    }catch(err){
        console.log("ERRR", err);
    }
};

module.exports = { AddBlog, SaveBlog, ViewBlog, MyBlog, EditBlog, UpdateBlog , DeleteBlog}