const express = require('express');
const router = express.Router();
// const user = require('../models/user');
const User = require('../models/user');
const SignInPost = require('../controllers/authController');

router.get('/',(req,res)=>{
    res.render('home_page',{error : ''});
})

router.post('/dashboard',SignInPost);

module.exports = router;