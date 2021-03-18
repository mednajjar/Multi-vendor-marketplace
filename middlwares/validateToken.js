const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.cookies['auth-token'];
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
            if(err){
                return res.status(401).json({error: 'Access denied'});
            }else{
                req.userInfo = decoded;
                next(); 
            }
        });
    } catch (error) {
        res.status(401).json({err: 'Access Not Authorized'});
    }
}