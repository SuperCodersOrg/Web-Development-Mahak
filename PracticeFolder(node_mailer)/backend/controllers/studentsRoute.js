const express = require('express');
const path = require('path');

let homeGet= (req, res) => {
    res.redirect("./studenthome.html");
}

let infoGet=  (req, res) => {
    res.redirect("./studentinfo.html")
}

module.exports = {homeGet,infoGet};