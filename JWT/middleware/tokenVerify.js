const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const port = 3300;
const SecretKey = 'Mahak';
const TokenCookie = 'token';

function verifyToken(req, res, next) {
    const token = req.cookies[TokenCookie];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const data = jwt.verify(token, SecretKey);
        req.username = data.username;
        req.role = data.role;
       return next();
    } catch (err) {
        return res.status(401).send('Unauthorized');
    }


};

module.exports = verifyToken;