const express = require('express');
const router = express.Router();

const {signinPost,loginPost} = require('../controllers/authentication');

router.post('/signin', signinPost);

router.post('/login', loginPost);

module.exports = router;