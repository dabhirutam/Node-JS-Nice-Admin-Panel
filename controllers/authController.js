const authModel = require("../models/authModel");
const bcrypt = require('bcrypt');
const fs = require('fs')

const Home = async (req, res) => {
    res.render('index', {msg: req.flash('logIn')[0]});
};

const SignUp = (req, res) => res.render('signUp');

const LogIn = (req, res) => res.render('logIn');

const Register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        bcrypt.hash(password, 10, async (err, hashPassword) => {
            if (!err) {
                const admin = await new authModel({
                    userName,
                    email,
                    password: hashPassword,
                });

                await admin.save();

                console.log("Admin is Created...");

                res.redirect('/logIn');
            }
        });
    } catch (err) {
        console.log("ERR", err);
    }
};

const SignIn = async (req, res) => {
    req.flash('logIn', `LogIn is succesfully ${req.user.userName}`);

    res.cookie('uid', req.user._id, { maxAge: 1000 * 60 * 60, expire: true, httpOnly: true });
    res.redirect('/');
};

const SignOut = (req, res) => {
    req.logOut((err) => {
        if(!err){
            res.clearCookie('uid');
            res.redirect('/login');
        }
    })
};

const Profile = async (req, res) => {
    res.render('profile');
};

const UpdateProfile = async (req, res) => {

    let updatedAdmin;

    if (req.file) {
        fs.unlink(req.body.profile, () => console.log("Avatar is Updeting"));
        updatedAdmin = { ...req.body, avatar: req.file.path };
    } else updatedAdmin = req.body;

    await authModel.findByIdAndUpdate(req.user._id, updatedAdmin);

    res.redirect('profile');
};

const ChangePassword = (req, res) => {
    const {oldPassword, newPassword, renewPassword} = req.body;

    bcrypt.compare(oldPassword, req.user.password, (err, pass) => {
        if(!err && pass){
            if(newPassword === renewPassword){
                bcrypt.hash(newPassword, 10, async (err, hashPassword) => {
                    await authModel.findByIdAndUpdate(req.user._id, {password: hashPassword});
                    console.log("Pssword Changesd");
                    
                    res.redirect('/');
                });
            }
        }
    });
};

module.exports = { Home, SignUp, Register, LogIn, SignIn, SignOut , Profile, UpdateProfile, ChangePassword}