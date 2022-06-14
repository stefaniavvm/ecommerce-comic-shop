const { json } = require('express');
const jwt = require('jsonwebtoken');

const isAuthenticated =( req,res, next) =>{
    const authorization = req.headers.authorization;

    if (!authorization){
        return res.status(401).json('Not authorized');
    };

    const separated = authorization.split('')
    if (separated.length !== 2 || separated[0] !== 'Bearer'){
        return res.status(400).json('Authorization incorrect');
    }
    const [, token] = separated;

    try{
        const tokenInfo = jwt.verify(token, req.app.get('jwt-secret'));
        req.authority ={
            id: tokenInfo.uid,
            password:tokenInfo.password,
            email:tokenInfo.email,
            admin:tokenInfo.admin
        };
        next();
    }catch (error){
        return res.status(403),json(error);
    }
};

module.exports ={
    isAuthenticated,
};