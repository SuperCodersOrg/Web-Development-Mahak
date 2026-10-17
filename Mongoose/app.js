const express = require('express');
const app = express();
require('dotenv').config();
const port = 3300;

const auth = require('./routes/auth');
app.set('view engine','ejs');
app.use(auth);
app.listen(port,()=>{
console.log("Server is running at : ",port);
})