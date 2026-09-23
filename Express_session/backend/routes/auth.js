const express = require('express');
const path = require('path');
const router = express.Router();

const user = {
    student1: { password: "1234", role: 'student' },
    teacher1: { password: "4321", role: 'teacher' }
};

router.post('/signin', (req, res) => {
    const { username, password, role } = req.body;

    if(!username || !password || !role){
        return res.send("Please enter all fields");
    }
    if (user[username]) {
       res.redirect("./signin.html");
    }

    user[username] = {
      
        password,
        role
    };

    req.session.user = {
        username,
        role
    };

    if (role == "student") {
        res.redirect("./studenthome.html")
    } else {
        res.redirect("./teacherhome.html");
    }
});

router.post('/login', (req, res) => {
    const { username, password ,role} = req.body;
    const users = user[username];

    if (users && users.password == password) {
        req.session.user = {
            username,
            role: users.role
        };

        if (users.role == "student") {
            res.redirect("./studenthome.html");
        } else {
            res.redirect("./teacherhome.html");

        }
    } else {
            res.redirect("./signin.html");

    }
});

module.exports = router;