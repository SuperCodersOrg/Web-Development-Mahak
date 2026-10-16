const express = require('express');
const app = exprerss();
const port = 3300;

const auth = require('./routes/auth');
app.use(auth);
app.listen(port,()=>{
console.log("Server is running at : ",port);
})