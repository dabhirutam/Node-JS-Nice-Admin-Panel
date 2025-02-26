const Auth = (req, res, next) => {
    req.cookies.uid ? next() : res.redirect('/login');
};

const LogInMiddleware = (req, res, next) => {
    req.cookies.uid ? res.redirect('/') : next();
};

module.exports = { Auth, LogInMiddleware }