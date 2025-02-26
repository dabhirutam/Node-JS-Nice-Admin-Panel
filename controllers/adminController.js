const adminModel = require("../models/adminModel");
const bcrypt = require('bcrypt');

const Home = async (req, res) => {
    const admin = await adminModel.findById(req.cookies.uid);

    res.render('index', { admin });
};

const SignUp = (req, res) => res.render('signUp');

const LogIn = (req, res) => res.render('logIn');

const Register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        bcrypt.hash(password, 10, async (err, hashPassword) => {
            if (!err) {
                const admin = await new adminModel({
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
    try {
        const admin = await adminModel.findOne({ email: req.body.email });

        bcrypt.compare(req.body.password, admin.password, (err, pass) => {
            if (!err && pass) {
                res.cookie('uid', admin._id, { maxAge: 1000 * 60 * 60, expier: true, httpOnly: true });
                res.redirect('/');
            } else res.redirect('/login');
        });
    } catch (err) {
        console.log("ERR", err);
    }
};

const SignOut = (req, res) => {
    try {
        res.clearCookie('uid');
        res.redirect('/')
    } catch (err) {
        console.log("ERR", err);
    }
};

const Profile = async (req, res) => {
    const admin = await adminModel.findById(req.cookies.uid);
    res.render('profile', { admin });
};

const UpdateProfile = async (req, res) => {
    const updatedAdmin = {...req.body, avatar: req.file.path};

    await adminModel.findByIdAndUpdate(req.cookies.uid, updatedAdmin);

    res.redirect('profile');
};

module.exports = { Home, SignUp, Register, LogIn, SignIn, SignOut, Profile, UpdateProfile }