const authModel = require("../models/authModel")

const AdminGet = async (req, res, next) => {

    if(req.user){
        admin = req.user;
    }else{
        admin = await authModel.findById(req.cookies.uid);
    }
    next();
}

module.exports = { AdminGet }