const express = require('express');
const router = express.Router();
const path = require('path');
router.use(express.static("../frontend"));

// router.use(express.static(path.join(__dirname, 'frontend')));
const isloggedin = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else
        res.redirect("./login.html");
        // res.sendFile(__dirname, '../../frontend/login.html');
}

router.get('/home', isloggedin, (req, res) => {
    // res.sendFile(path.join(__dirname, '../../frontend/teacherhome.html'))
    // ;
    res.redirect("./teacherhome.html");
})

router.get('/info', isloggedin, (req, res) => {
    // res.sendFile(path.join(__dirname, '../../frontend/tetacherinfo.html'));
    res.redirect("./teacherinfo.html");

})


module.exports = router;
