const jwt=require('jsonwebtoken');
require('dotenv').config();
function auth(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        const err=new Error('No token provided. Please Login.');
        err.status=401;
        return next(err);
    }
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        const error=new Error('Invalid or expired token. please login again');
        error.status=401;
        next(error);
    }
}

module.exports=auth;