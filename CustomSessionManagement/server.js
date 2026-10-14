const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const sessionMiddleware = require('./middlewares/verifyMiddleware');

let port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('home');
})

app.use(sessionMiddleware);
app.use(authRoutes);

app.get('/dashboard', (req, res) => {
if (!req.session) {
return res.status(401).send('Please login first');
}

res.render('dashboard');

});

app.listen(port,()=>{
    console.log("Server running at : ",port)
})