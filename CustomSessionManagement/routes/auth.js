const express = require('express');
const fs = require('fs');
const router = express.Router();
const crypto = require('crypto');
const TokenCookie = 'token';

const serverSession = require('../middlewares/sessionStore');

function setTokenCookie(res, token) {
    res.cookie(TokenCookie, token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    });
}

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    let usersData = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

    const user = usersData.find(u =>
      {return u.username === username;}
    );

    if (!user) {
        res.status(404).send("Invalid user credentials. Please try again!");
    }

    let sessionId = crypto.randomBytes(20).toString('hex');

    let sessionData = {
        username: username
    }
    serverSession[sessionId] = sessionData;

    setTokenCookie(res, sessionId);

     res.redirect('/dashboard');

})

router.get('/logout',(req,res)=>{

    const sessionId = req.cookies[TokenCookie];
    if(sessionId){
        delete serverSession[sessionId];
    }
    res.clearCookie(TokenCookie)
    return res.redirect('/login');
})

module.exports = router; 