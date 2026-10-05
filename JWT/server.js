const express = require('express');
const jwt = require('jsonwebtoken');  
const app = express();
const port = 3300;
const auth = require('./routes/auth.js');
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(auth);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
