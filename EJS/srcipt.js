const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const studentroutes = require("./routes/student");

const port = 3300;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.use('/student', studentroutes);

app.listen(port, () => {
    console.log("Server is live at port:", port);
});



// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3300;

// app.use((req,res,next)=>{
//     console.log("a");
//     next();
// console.log("this"); // after all the execution this will print due to the next in the last middleware  

// })
// app.use((req,res,next)=>{
//     console.log("b");
//     next();
// })

// app.get('/user',(req,res,next)=>{
// console.log("c");
// next();
// console.log("hello");
// })
// app.get('/user',(req,res,next)=>{
//     console.log("d");
// // next();
// res.send("Hello");
// // next();
// })

// app.listen(port,()=>{
//     console.log("server is running at : ",port);
    
// })

// // output : a b c d hello this