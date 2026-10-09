const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static("../frontend"));

const isloggedin = require('../middlewares/isLoggedin');

const {homeGet,infoGet} = require('../controllers/studentsRoute');

router.get('/home',isloggedin, homeGet);

router.get('/info',isloggedin, infoGet);

module.exports = router;