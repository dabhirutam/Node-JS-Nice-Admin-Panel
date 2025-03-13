const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const blogImgs = require('../middleware/blogMiddleware');
const { AdminGet } = require('../middleware/adminGetMiddleware');
const blogRoutes = express.Router();

blogRoutes.use(authMiddleware.Auth, AdminGet);

blogRoutes.get('/addBlog', blogController.AddBlog);
blogRoutes.get('/viewBlog', blogController.ViewBlog);
blogRoutes.get('/myBlog', blogController.MyBlog);
blogRoutes.get('/editBlog/:_id', blogController.EditBlog);
blogRoutes.get('/deleteBlog/:_id', blogController.DeleteBlog);

blogRoutes.post('/addBlog', blogImgs.single('blogImg'), blogController.SaveBlog);
blogRoutes.post('/editBlog', blogImgs.single('blogImg'), blogController.UpdateBlog);

module.exports = blogRoutes;