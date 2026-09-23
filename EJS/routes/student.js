const express = require('express');
const router = express.Router();
const path = require('path');
router.use(express.json());
// const app = express();

router.post('/home',(req,res)=>{
    console.log(req.body);
    res.render('file',{username : req.body.username});
})

module.exports = router;