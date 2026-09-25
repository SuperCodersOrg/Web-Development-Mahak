const express = require('express');
const { Session } = require('inspector');
const path = require('path');
const app = express();
const port = 3300;

app.get('/login', (req, res) => {
    res.render('')
})

app.listen(port, () => {
    console.log("server is running at : ", port);
})