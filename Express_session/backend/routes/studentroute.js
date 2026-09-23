const express = require('express');
const router = express.Router();
const path = require('path');


router.use(express.static("../frontend"));

const isloggedin = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else
    res.redirect("./index.html");
}

router.get('/home',isloggedin, (req, res) => {
    res.redirect("./studenthome.html");
})

router.get('/info',isloggedin,  (req, res) => {
    res.redirect("./studentinfo.html")
})


module.exports = router;