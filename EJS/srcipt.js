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