const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const passport = require('../middleware/passportLocalMiddleware');
const profileImgs = require('../middleware/profileMiddleware');
const { AdminGet } = require('../middleware/adminGetMiddleware');
const authRoutes = express.Router();

authRoutes.use(AdminGet);

authRoutes.get('/', authMiddleware.Auth, authController.Home);
authRoutes.get('/signUp', authController.SignUp);
authRoutes.get('/logIn', authMiddleware.LogIn, authController.LogIn);
authRoutes.get('/signOut', authController.SignOut);
authRoutes.get('/profile', authMiddleware.Auth, authController.Profile);

authRoutes.post('/register', authController.Register);
authRoutes.post('/changePassword', authController.ChangePassword);
authRoutes.post('/signIn', passport.authenticate('local', { failureRedirect: '/logIn' }), authController.SignIn);
authRoutes.post('/updateProfile', profileImgs.single('avatar'), authController.UpdateProfile);


module.exports = authRoutes;