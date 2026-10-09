const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static("../frontend"));

const isloggedin = require('../middlewares/isLoggedin');

const {homeget,infoGet} = require('../controllers/TeachersRoute');

router.get('/home', isloggedin, homeget);

router.get('/info', isloggedin, infoGet);

module.exports = router;