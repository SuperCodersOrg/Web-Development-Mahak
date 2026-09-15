const http = require('http');
const fs = require('fs');

const path = require('path');
const e = require('express');
const port = 3300;
const server = http.createServer((req, res) => {
    let url = req.url.split('/');
    console.log(url);

    if (req.url === '/' || req.url === '') {
        res.end(`
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div>
        <div>
            <h1>ABC college</h1>
        </div>
        <div>
            Welcome to ABC College
            <br>
            Empowering Students for a Better Future
            <br>

        </div>
        <nav>
            <a href="http://localhost:3300/">Home</a>
            <a href="http://localhost:3300/about">About</a>
            <a href="http://localhost:3300/courses">Courses</a>
            <a href="http://localhost:3300/students">Students details</a>
            <a href="http://localhost:3300/contact">Contact Details</a>
            <a href="http://localhost:3300/facilities">Facilities</a>
            <a href="http://localhost:3300/placement">Placement</a>

        </nav>
        <br>
        <div>
            <!-- <a href="http://localhost:3300/about">
                College Highlights
            </a> -->
            <div>
                <b>
                    College Highlights
                </b>
            </div>
            <div>
                <br>
                1200+ : Students
            </div><br>
            <div>
                4 : Courses
            </div><br>
            <div>
                85%:Placement
            </div>
        </div>
        <br>
        <div>
            <a href="http://localhost:3300/courses"><b>Our Courses</b> </a>
            <!-- <a href="courses.html">Our courses</a> -->
            <!-- <div>
                <b>
                    Our courses
                </b>
             </div> -->
            <div><br> BCA </div>
            <div>
                B.Tech CSE
            </div>
            <div>B.Tech AI & ML</div>
            <div>BBA</div>
        </div>
        <div>
            <a href="http://localhost:3300/placements">Placement Highlights</a>
            <div> 85% Placement Rate | ₹12 LPA Highest</div>
        </div>
        <div>
            <a href="/contact"> Contact Us</a>
            <div>Panipat, Haryana</div>
            <div> +91 98765 43210</div>
            <div>abc@college.edu</div>
        </div>
    </div>


    <script src="script.js"></script>
</body>





</html>
        `)
    }

    else if (req.url === '/courses' && url.length < 3) {

        const courseData = JSON.parse(fs.readFileSync('course.json', 'utf8'));

        //    console.log(JSON.parse(courseData));

        let data = courseData.map((course) => {
            return ` <div>
            <a href = "http://localhost:3300/courses/${course.id}">${course.name}</a>

        </div>
    `;

        }).join("");



        res.end(`
        <html>
        <body>
         <a href="http://localhost:3300/">Home</a>
            <h1>Available Courses</h1>
            ${data}
        </body>
        </html>
`);
    }

    else if (url[1] === 'courses' && url.length >= 3) {
        console.log("coures print");
        const couresdata = JSON.parse(fs.readFileSync('course.json', 'utf8'));

        let filter = couresdata.filter((course) => {
            return course.id === url[2];

        })

        let data = filter.map((course) => {
            return ` <div>
            <h2>${course.name}</h2>
            <p>${course.id}</p>
            <p>${course.duration}</p>
            <p>${course.seats}</p>
            <p>${course.eligibility}</p>
            <p>${course.department}</p>
        </div>
    `;
        })
        res.end(`
        <html>
           <body>
            <a href="http://localhost:3300/">Home</a>
             ${data}
            </body>
        </html>
`);
    }

    else if (req.url === '/about') {
        const data = JSON.parse(fs.readFileSync('college.json', 'utf8'));
        res.end(`
            <html>
        <body>
                    <a href="http://localhost:3300/">Home</a>
            <h1>${data.name}</h1>
            <p>Established: ${data.established}</p>
            <p>Located: ${data.location}</p>
            <p>Total students : ${data.totalStudents}</p>
            <p>Active batches : ${data.activeBatches}</p>
            <p>Placements : ${data.placements}</p>
        </body>
    </html>
            `)
    }
 

    else if (req.url === '/students') {

       

        let html = fs.readFileSync(
            path.join(__dirname, '..', 'frontend/studentregister.html'),
            'utf8'
        );

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(html);
    }

    else if (req.url === '/students-data') {
        if (req.method === 'GET') {
            let data = fs.readFileSync('students.json', 'utf8');

            // console.log(data);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(data);
        }

        // else if (req.method === 'POST') {
        //    let jsondata = req.data;
        //    console.log(jsondata);
        //     let data = fs.readFileSync('students.JSON', 'utf8');

        //     res.end(data);
        // }
    }

    else if (req.url === '/placement') {

        let data = JSON.parse(fs.readFileSync('placement.json', 'utf8'));

        let recruiters = data.topRecruiters.map((rec) => {
            return `
            <tr>
                <td>${rec.name}</td>
                <td>${rec.package}</td>
                <td>${rec.studentsHired}</td>
            </tr>
        `;
        }).join("");

        let placementprocess = data.placementProcess.map((process) => {
            return `<li>${process}</li>`;
        }).join("");

        let trainingPrograms = data.trainingPrograms.map((training) => {
            return `<li>${training}</li>`;
        }).join("");

        res.end(`
        <html>

            <body>

                <a href="http://localhost:3300/">Home</a>

                <h1>Placement Information</h1>

                <h2>Placement Statistics</h2>

                <p><b>Placement Rate:</b> ${data.placementRate}</p>
                <p><b>Academic Year:</b> ${data.academicYear}</p>
                <p><b>Students Eligible:</b> ${data.studentsEligible}</p>
                <p><b>Students Placed:</b> ${data.studentsPlaced}</p>
                <p><b>Companies Visited:</b> ${data.companiesVisited}</p>
                <p><b>Highest Package:</b> ${data.highestPackage}</p>
                <p><b>Average Package:</b> ${data.averagePackage}</p>
                <p><b>Lowest Package:</b> ${data.lowestPackage}</p>

                <h2>Top Recruiters</h2>

                <table border="2">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Package</th>
                            <th>Students Hired</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${recruiters}
                    </tbody>

                </table>

                <h2>Placement Process</h2>

                <ol>
                    ${placementprocess}
                </ol>

                <h2>Training Programs</h2>

                <ul>
                    ${trainingPrograms}
                </ul>

            </body>

        </html>
    `);
    }

    else if (req.url === '/contact') {

        res.end(`
        <html>
            <body>
                        <a href="http://localhost:3300/">Home</a>
                <h1>Contact Us</h1>

                <h3>College Name</h3>
                <p>ABC College </p>

                <h3>Address</h3>
                <p>123 College Road, Delhi, India</p>

                <h3>Phone</h3>
                <p>+91 9876543210</p>

                <h3>Email</h3>
                <p>info@abccollege.com</p>
            </body>
        </html>
    `);

    }

    else if (req.url === '/facilities') {

        let data = JSON.parse(
            fs.readFileSync('facilities.json', 'utf8')
        );

        let facilities = data.map((facility) => {

            let facilityList = facility.facilities.map((item) => {
                return `<li>${item}</li>`;
            }).join("");

            return `
            <div>
            
                <h2>${facility.name}</h2>

                <p><b>ID:</b> ${facility.id}</p>

                <p><b>Description:</b> ${facility.description}</p>

                <p><b>Capacity:</b> ${facility.capacity}</p>

                <p><b>Timings:</b> ${facility.timings}</p>

                <h4>Facilities:</h4>
                <ul>
                    ${facilityList}
                </ul>
            </div>

            <hr>
        `;

        }).join("");



        res.end(`
        <html>
            <body>
            <a href="http://localhost:3300/">Home</a>
                <h1>College Facilities</h1>

                ${facilities}

            </body>
        </html>
    `);
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