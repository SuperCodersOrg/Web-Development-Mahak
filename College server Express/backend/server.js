const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3300;
const express = require('express');
const { json } = require('stream/consumers');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
})

app.get('/home', (req, res) => {
    console.log("Home clicked");
    let data = JSON.parse(
        fs.readFileSync('home.json', 'utf8')
    );


    res.send(JSON.stringify(data));
})

app.get('/courses', (req, res) => {
    const courseData = JSON.parse(fs.readFileSync('course.json', 'utf8'));

    res.send(JSON.stringify(courseData));
})

app.get('/courses/:id', (req, res) => {

    let coursedata = req.params.id;

    const courseData = JSON.parse(fs.readFileSync('course.json', 'utf8'));

    let finaldata = courseData.find(course => { return course.id === coursedata });
    res.send(JSON.stringify(finaldata));
})

app.get('/about', (req, res) => {
    const data = JSON.parse(
        fs.readFileSync('college.json', 'utf8')
    );

    res.send(JSON.stringify(data));
})

app.get('/students', (req, res) => {
    const data = JSON.parse(
        fs.readFileSync('students.json', 'utf8')
    );

    res.send(JSON.stringify(data));
})

app.get('/placement', (req, res) => {
    let data = JSON.parse(fs.readFileSync('placement.json', 'utf8'));

    res.send(JSON.stringify(data));
})

app.get('/contact', (req, res) => {
    const data = JSON.parse(
        fs.readFileSync('contact.json', 'utf8')
    );

    res.send(JSON.stringify(data));
})

app.get('/facilities', (req, res) => {
    const data = JSON.parse(
        fs.readFileSync('facilities.json', 'utf8')
    );

    res.send(JSON.stringify(data));
})

// app.post('/students-data', (req, res) => {
//     console.log("request send");

//     let data = JSON.parse(fs.readFileSync('students.json', 'utf8'));
//     console.log(data);

//     let task = JSON.parse(req.body);
//     console.log(task);

//     data.students.push(task);

//     fs.writeFileSync(
//         'students.json',
//         JSON.stringify(data, null, 2),
//         'utf8'
//     );
//     res.send(json.stringify(data));
// })

app.post('/students-data', (req, res) => {

    console.log("POST /students-data request received");

    let data = JSON.parse(
        fs.readFileSync('students.json', 'utf8')
    );

    console.log("Old data:", data);

    let task = req.body;

    console.log("New student:", task);

    data.students.push(task);

    fs.writeFileSync(
        'students.json',
        JSON.stringify(data, null, 2),
        'utf8'
    );

    res.json(data);
});

app.listen(port, () => {
    console.log("server is running on port", port);
})