const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const nodemailer = require('nodemailer');
const port = 3300;
const SecretKey = 'Mahak';
const TokenCookie = 'token';
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');

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

let ourEmail = "mahak0506060@gmail.com";
let pass = "ktfg mlgi lkis djbx"
let users = JSON.parse(fs.readFileSync('./data/user.json'));

router.get('/verify', (req, res) => {
    res.render('verify');
});

router.post('/verify', (req, res) => {
    let { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const verification = {
        email: email,
        token: token,
        expiresAt: Date.now() + 15 * 60 * 1000
    };


    verificationTokens.push(verification);
    console.log("verification",verification);
    console.log("Token verifinaction",verificationTokens);

    const signinLink = `http://localhost:3300/signin/${token}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: ourEmail,
            pass: pass
        }
    });


    transporter.sendMail({
        from: ourEmail,
        to: email,
        subject: 'Verify yourself',
        html: `<p>You requested a signin request.
    Click <a href="${signinLink}">here</a> to signin.
    Link expires in 15 minutes.</p>`
    }, (error, info) => {
        if (error) {
            console.error("Email sending failed:", error);
            return res.status(500).send("Error sending email");
        }

        console.log("Email sent successfully:");
        res.send(`Signin link has been sent to ${email}`);
    });

});

router.get('/signin/:id', (req, res) => {
    res.render('signin', {
        id: req.params.id
    });
});

router.post('/signin/:id', (req, res) => {
    let { username, password, email } = req.body;

    const verification = verificationTokens.find(
        v => v.token === req.params.id
    );

    if (!verification) {
        return res.status(400).send("Token not found");
    }

    if (verification.expiresAt < Date.now()) {
        return res.status(400).send("Token expired");
    }

    if (verification.email !== email) {
        return res.status(400).send("Email does not match");
    }

    if (!username || !password || !email) {
        return res.send("Please enter all fields");
    }

    let user = users.find(
        u => u.username === username || u.email === email
    );

    if (user) {
        return res.status(400).send("User already exists");
    }

    bcrypt.hash(password, 10, (err, hash) => {

        if (err) {
            return res.status(500).send("Error hashing password");
        }

        users.push({
            username: username,
            password: hash,
            email: email
        });

        const newUser = users[users.length - 1];

        const token = createToken(newUser);

        setTokenCookie(res, token);

        fs.writeFileSync('./data/user.json', JSON.stringify(users, null, 2));

        res.render('dashboard', {
            username: username,
            email: email
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    const user = users.find(
        u => u.username === username
    );

    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    bcrypt.compare(password, user.password, (err, result) => {

        if (err) {
            return res.status(500).send('Error checking password');
        }

        if (!result) {
            return res.status(401).send('Invalid credentials');
        }

        const token = createToken(user);

        setTokenCookie(res, token);

        res.render('dashboard', {
            username: user.username,
            email: user.email
        });
    });
});

module.exports = router;