const express = require('express');
const path = require('path');

let homeget= (req, res) => {
    res.redirect("./teacherhome.html");
}

let infoGet = (req, res) => {
    res.redirect("./teacherinfo.html");
}

module.exports = {homeget,infoGet};