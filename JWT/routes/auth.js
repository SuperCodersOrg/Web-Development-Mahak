const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const port = 3300;

const SecretKey = 'Mahak';
const TokenCookie = 'token';
const verifyToken = require('../middleware/tokenVerify.js');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

function createToken(user) {
    return jwt.sign({
        username: user.username, role: user.role
    }, SecretKey,
        { expiresIn: '15m' });
}

function setTokenCookie(res, token) {
    res.cookie(TokenCookie, token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 
    });
}


let users = [
    { username: 'mahak', password: '123', role: 'admin' },
    { username: 'vanshika', password: '456', role: 'user' }
];

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        users.push({ username, password, role: 'user' });
        const newUser = users[users.length - 1];
        const token = createToken(newUser);
        setTokenCookie(res, token);
    } else {
        const token = createToken(user);
        setTokenCookie(res, token);
    }
    res.redirect('/dashboard');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }else{
        const token = createToken(user);
    setTokenCookie(res, token);
        res.redirect('/dashboard');
    }

});

router.get('/dashboard',verifyToken, (req, res) => {
const usersData = { username: req.username, role: req.role };
    res.render('dashboard', usersData);
});

module.exports = router;