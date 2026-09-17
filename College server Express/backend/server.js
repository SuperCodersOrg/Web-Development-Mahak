const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3300;
const express = require('express');

const app = express();
app.use(express.json());



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }
    next();
})

app.get('/home', (req, res) => {
    console.log("Home clicked");
    let data = JSON.parse(
        fs.readFileSync('home.json', 'utf8')
    );

    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });

    res.send(JSON.stringify(data));
})

app.get('/courses', (req, res) => {
    const courseData = JSON.parse(fs.readFileSync('course.json', 'utf8'));

    res.send(JSON.stringify(courseData));
})

app.get('/about', (req, res) => {
    const data = JSON.parse(
        fs.readFileSync('college.json', 'utf8')
    );

    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });

    res.send(JSON.stringify(data));
})

app.get('/students', (req, res) => {
    const data = JSON.parse(
        fs.readFileSync('students.json', 'utf8')
    );

    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });

    res.send(JSON.stringify(data));
})

app.get('/placement', (req, res) => {
    let data = JSON.parse(fs.readFileSync('placement.json', 'utf8'));

    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });
    res.send(JSON.stringify(data));
})

app.get('/contact', (req, res) => {
    const data = JSON.parse(
        fs.readFileSync('contact.json', 'utf8')
    );
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });
    res.send(JSON.stringify(data));
})

app.get('/facilities', (req, res) => {
    const data = JSON.parse(
        fs.readFileSync('facilities.json', 'utf8')
    );

    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });

    res.send(JSON.stringify(data));
})
app.listen(port, () => {
    console.log("server is running on port", port);
})