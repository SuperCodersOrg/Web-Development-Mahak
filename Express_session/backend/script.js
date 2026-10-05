const express = require('express');
const path = require('path');
const session = require('express-session');

const authrouts = require("./routes/auth");
const studentroute = require("./routes/studentroute");
const teacherroute = require("./routes/teacherroute");
const forgetPassword = require("./routes/forget_password");

const app = express();
const port = 3300;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(
    session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,   
        maxAge: 1000 * 60 * 10  // This tells us that till how much time data will store in a cookie
    }
}));
app.use(express.static("../frontend"));

app.get('/',(req,res)=>{
    res.redirect("./index.html");
})

app.use(authrouts);
app.use('/students',studentroute);
app.use('/teacher',teacherroute);
app.use(forgetPassword);

app.listen(port,()=>{
    console.log("Server running at port : ",port);
})

