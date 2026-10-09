const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const ourEmail = process.env.EMAIL || 'mahak98120@gmail.com';
const password = process.env.PASSWORD;

let forgetGet = (req, res) => {
    res.render('forget');
};

let forgetPost = (req, res) => {
    const { email, username } = req.body;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));

    if (!users[username]) {
        return res.send("No user found with this username");
    }

    const token = crypto.randomBytes(20).toString('hex');

    users[username].resetToken = token;
    users[username].resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2));
    const resetLink = `http://localhost:3300/reset/${token}?username=${username}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: ourEmail, pass: password }
    });

    transporter.sendMail({
        from: ourEmail,
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`
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
};

let resetGet = (req, res) => {
    const { username } = req.query;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
    const user = users[username];

    if (user && user.resetToken === req.params.token && user.resetTokenExpiry > Date.now()) {
        res.render('reset', {
            token: req.params.token,
            username: username,
            error: ''
        });
    } else {
        res.render('reset', {
            token: '',
            username: '',
            error: 'This password reset link is invalid or has expired.'
        });
    }

};

let resetPost = (req, res) => {
    const { username, password, token } = req.body;


    const users = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf8')
    );

    const user = users[username];

    if (!user ||!user.resetToken ||user.resetToken !== token ||user.resetTokenExpiry <= Date.now()) {
        return res.status(400).send("Invalid or expired token");
    }

    if (!password || password.trim().length < 8) {
        return res.status(400).send("Password must be at least 8 characters long");
    }

    user.password = password;

    delete user.resetToken;
    delete user.resetTokenExpiry;

    fs.writeFileSync(
        path.join(__dirname, '../data/users.json'),
        JSON.stringify(users, null, 2)
    );

    res.send("Password has been reset successfully. You can now login.");


};


module.exports = { forgetGet, forgetPost, resetGet, resetPost };