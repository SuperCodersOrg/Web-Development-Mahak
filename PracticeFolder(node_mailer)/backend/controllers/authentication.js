const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

let signinPost = (req, res) => {
    let { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.send("Please enter all fields");
    }

    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));

    if (users[username]) {
        return res.redirect("./login.html");
    }

    let pass = crypto.randomBytes(20).toString('hex');
    password = pass;
    users[username] = { password, role };

    fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2));

    req.session.user = { username, role };

    if (role === "student") {
        res.redirect("./studenthome.html");
    } else {
        res.redirect("./teacherhome.html");
    }
};

let loginPost = (req, res) => {
    let { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
    const user = users[username];
    let pass = crypto.randomBytes(20).toString('hex');

    password = pass;
    user.password = password;
    if (user && user.password === password) {
        req.session.user = { username, role: user.role };

        if (user.role === "student") {
            console.log("Student logged in successfully");
           return res.redirect("./studenthome.html");
        } else {
          return res.redirect("./teacherhome.html");
        }
    } else {
        console.log("Invalid username or password");
        return res.redirect("./signin.html");
    }
};

module.exports = {signinPost,loginPost};