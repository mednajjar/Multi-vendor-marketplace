const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.authAdmin = (req, res, next) => {
    res.type = "admin";
    next();
}
exports.authLivreur = (req, res, next) => {
    res.type = "livreur";
    next();
}
exports.authVendeur = (req, res, next) => {
    res.type = "vendeur";
    next();
}
exports.authCustomer = (req, res, next) => {
    res.type = "customer";
    next();
}


exports.auth = async (req, res, next) => {
    const token = req.cookies['auth_token'];
    console.log(token)
    try{
      const verify = await  jwt.verify(token, process.env.TOKEN_SECRET);
      const userLog = verify; 
      
      
      
      console.log(userLog.roles)
            if(verify && userLog.roles == res.type){
                const user = await User.findById(userLog.id).select('-password');
                res.locals.user = user;
                console.log(res.locals.user)
                next();
            }
            else{
                res.status(400).json(`1 private root need ${res.type} to login`);
            }
      
    } catch(err) {
        res.locals.user = null;
        res.cookie('auth_token', '', { maxAge: 1 });
        res.status(400).json(`2 private root need ${res.type} to login`);
    }
};