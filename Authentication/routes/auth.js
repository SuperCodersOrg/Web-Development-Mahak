const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const nodeMailer = require('nodemailer');
const port = 3300;
const SecretKey = 'Mahak';
const TokenCookie = 'token';
const router = express.Router();
const crypto = require('crypto');


function createToken(user) {
    return jwt.sign({
        username: user.username
    }, SecretKey,
        { expiresIn: '15m' });
}

function setTokenCookie(res, token) {
    res.cookie(TokenCookie, token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 
    });
}


let users = JSON.parse(fs.readFileSync('./data/user.json'));

router.get('/verify', (req, res) => {
    res.render('verify');
});

router.post('/verify', (req, res) => {
    let {email} = req.body;  
});

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signin', (req, res) => {
    let { username, password, email } = req.body;

    let pass = crypto.randomBytes(20).toString('hex');
    password = pass;
    let user = users.find(u=>u.username === username && u.password === password && u.email === email);
    if(!user){

        if(!username || !password || !email){
            return res.send("Please enter all fields");
        }
        users.push({ username, password, email});
        const newUser = users[users.length - 1];
        const token = createToken(newUser);
        setTokenCookie(res, token);
    }

    fs.writeFileSync('./data/user.json', JSON.stringify(users, null, 2));
    res.render('dashboard',{
        username: username,
        email: email
    });

}); 

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    let pass = crypto.randomBytes(20).toString('hex');
    password = pass;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }else{
        const token = createToken(user);
        setTokenCookie(res, token);
        res.render('dashboard', {
            username: user.username,
            email: user.email
        });
    }

});

module.exports = router;