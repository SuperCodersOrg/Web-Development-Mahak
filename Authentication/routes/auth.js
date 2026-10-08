const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const nodemailer = require('nodemailer');
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

let verificationTokens = [];
let ourEmail = "mahak25024@cqst.in";
let pass = "";

let users = JSON.parse(fs.readFileSync('./data/user.json'));

router.get('/verify', (req, res) => {
    res.render('verify');
});

router.post('/verify', (req, res) => {
    let { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    // token.expiresIn = Date.now()+60*15*1000;
    const verification = {
        email: email,
        token: token,
        expiresAt: Date.now() + 15 * 60 * 1000
    };

    verificationTokens.push(verification);
    const signinLink = `http://localhost:3300/signin/${token}`;

    const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: ourEmail, pass: pass }
        });
    
        transporter.sendMail({
            from: ourEmail,
            to: email,
            subject: 'Verify yourself',
            html: `<p>You requested a signin request. Click <a href="${signinLink}">here</a> to signin. Link expires in 15 minutes.</p>`
        }, (error, info) => {
            console.log("Email sent successfully");
            if (error) {
                console.error(error);
                res.status(500).send('Error sending email');
            } else {
                console.log(info);
                res.send(`Password reset link has been sent to ${email}`);
            }
        });
});

router.get('/signin/:id', (req, res) => {

    res.render('signin');
});

router.post('/signin/:id', (req, res) => {
    let { username, password, email } = req.body;

    const verification = verificationTokens.find(
        v => v.token === req.params.id
    );

    if (!verification || verification.expiresAt < Date.now() || verification.email !== email) {
        return res.status(400).send("Invalid verification token");
    }
    let pass = crypto.randomBytes(20).toString('hex');
    password = pass;
    let user = users.find(u => u.username === username && u.password === password && u.email === email);
    if (!user) {

        if (!username || !password || !email) {
            return res.send("Please enter all fields");
        }
        users.push({ username, password, email });
        const newUser = users[users.length - 1];
        const token = createToken(newUser);
        setTokenCookie(res, token);
    }

    fs.writeFileSync('./data/user.json', JSON.stringify(users, null, 2));
    res.render('dashboard', {
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
    } else {
        const token = createToken(user);
        setTokenCookie(res, token);
        res.render('dashboard', {
            username: user.username,
            email: user.email
        });
    }

});

module.exports = router;