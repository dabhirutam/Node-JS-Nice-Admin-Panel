const express = require('express');
const db = require('./database/dbConfig')
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3005;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cookieParser());

app.use('/', routes);

app.listen(port, err => !err && console.log(`Server is Running is http://localhost:${port}`));