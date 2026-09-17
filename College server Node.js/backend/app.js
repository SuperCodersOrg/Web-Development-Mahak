const http = require('http');
const fs = require('fs');

const path = require('path');
const port = 3300;
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }
    let url = req.url.split('/');
    console.log(url);

    if (req.url === '/' || req.url === '/home') {

        let data = JSON.parse(
            fs.readFileSync('home.json', 'utf8')
        );

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(data));
    }

    else if (req.url === '/courses' && url.length < 3) {

        const courseData = JSON.parse(fs.readFileSync('course.json', 'utf8'));

        res.end(JSON.stringify(courseData));

    }

    else if (url[1] === 'courses' && url.length >= 3) {
        console.log("coures print");
        const couresdata = JSON.parse(fs.readFileSync('course.json', 'utf8'));

        let filter = couresdata.filter((course) => {
            return course.id === url[2];

        })

        let data = filter.map((course) => {
           res.end(JSON.stringify(course));
           })
        
    }

    else if (req.url === '/about') {

        const data = JSON.parse(
            fs.readFileSync('college.json', 'utf8')
        );

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(data));
    }

    else if (req.url === '/students') {

        const data = JSON.parse(
            fs.readFileSync('students.json', 'utf8')
        );

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(data));
    }

    else if (req.url === '/students-data') {
        if (req.method === 'GET') {
            let data = fs.readFileSync('students.json', 'utf8');

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(data);
        }

        else if (req.method === 'POST') {

            let body = '';
            req.on('data', (datavalue) => {
                body += datavalue;
                console.log(body);
                let file = fs.readFileSync('students.json', 'utf8');

                let finalData = JSON.parse(file);

                let newStudent = JSON.parse(body);

                finalData.students.push(newStudent);

                fs.writeFileSync(
                    'students.json',
                    JSON.stringify(finalData, null, 2),
                    'utf8'
                );

            })

            res.end("student added");
        }
    }

    else if (req.url === '/placement') {
        let data = JSON.parse(fs.readFileSync('placement.json', 'utf8'));

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(data));
    }

    else if (req.url === '/contact') {
        const data = JSON.parse(
            fs.readFileSync('contact.json', 'utf8')
        );

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(data));

    }

    else if (req.url === '/facilities') {

        const data = JSON.parse(
            fs.readFileSync('facilities.json', 'utf8')
        );

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(data));
    }

    else {

        res.statusCode = 404;

        res.end(`
        <html>
            <body>
                        <a href="http://localhost:3300/">Home</a>
                <h1>404 - Page Not Found</h1>
            </body>
        </html>
    `);
    }


})

server.listen(port, () => {
    console.log("server is running on port", port);
})