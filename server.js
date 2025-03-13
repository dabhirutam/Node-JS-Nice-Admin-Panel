const express = require('express');
const db = require('./database/dbConfig')
const bodyParser = require('body-parser');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3007;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(flash());

app.use('/', authRoutes, blogRoutes);

app.listen(port, err => !err && console.log(`Server is Running is http://localhost:${port}`));