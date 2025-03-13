const passport = require('passport');
const LocalStrategy = require('passport-local');
const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({usernameField: 'email'}, async function(email, password, done) {
    const admin = await authModel.findOne({ email: email });    

    if (!admin) {
        done(null, false);
    }

    if (admin) {
        bcrypt.compare(password, admin.password, (err, pass) => {
            if (!err && pass) {
                done(null, admin);
            } else {
                done(err, false);
            }
        });
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const admin = await authModel.findById(id);

    done(null, admin);
});

module.exports = passport;