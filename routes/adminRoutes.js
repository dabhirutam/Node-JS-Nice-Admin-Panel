const express = require('express');
const { Home, Register, SignUp, LogIn, SignIn, SignOut, Profile, UpdateProfile } = require('../controllers/adminController');
const { Auth, LogInMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');
const routes = express.Router();

routes.get('/', Auth, Home);
routes.get('/signUp', SignUp);
routes.get('/logIn', LogInMiddleware, LogIn);
routes.get('/signOut', SignOut);
routes.get('/profile', Auth, Profile);

routes.post('/register', Register);
routes.post('/signIn', SignIn);
routes.post('/updateProfile', upload.single('avatar'), UpdateProfile);

module.exports = routes;