
const Auth = (req, res, next) => {
    if(req.isAuthenticated() || req.cookies.uid){
        next(null)
    }else res.redirect('/login');
};

const LogIn = async (req, res, next) => {
    if(req.cookies.uid || req.isAuthenticated()){
        res.redirect('/')
    }else next();
};


module.exports = { Auth, LogIn }