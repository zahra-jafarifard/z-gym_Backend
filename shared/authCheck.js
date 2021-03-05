const jwt = require('jsonwebtoken');
const httpError = require('./httpError');

module.exports = (req , res ,next)=> {
    if(req.method === 'OPTION'){
        return next();
    }
    try{
        let token = req.header('authorization').split(' ')[1];
        console.log(token);
        if (!token){
            throw new httpError('Authentication failed...' , 401);
        }
        jwt.verify(token , 'mySecretKey')
        .then( decoded =>{
            req.userId= decoded.userId;
            req.userMobile = decoded.mobile;
            console.log('in authcheck file ::::',req.userId , req.userMobile)
        })
        .catch(e =>{
            next(new httpError(e , 500));
        })

        next();
        
    }catch(err){
        return next(new httpError(err , 401))
    }
}