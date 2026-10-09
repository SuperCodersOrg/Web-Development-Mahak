const express = require('express');
const router = express.Router();

const {forgetGet,forgetPost,resetGet,resetPost} = require('../controllers/ForgetPassword');

router.get('/forget', forgetGet);

router.post('/forget', forgetPost);

router.get('/reset/:token', resetGet);

router.post('/reset/:token', resetPost);

module.exports = router;
