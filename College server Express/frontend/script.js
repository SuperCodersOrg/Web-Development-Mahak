let navigationbar = document.getElementById("navigationbar");
let mainframe = document.getElementById("mainframe");

function homedata(data) {

    mainframe.innerHTML = "";

    mainframe.innerHTML = `
        <div>
            <h1>${data.title}</h1>

            <p>${data.description}</p>

            <h2>College Highlights</h2>

            <ul>
                ${data.highlights.map((highlight) => `
                    <li>${highlight}</li>
                `).join("")}
            </ul>

            <h2>College Statistics</h2>

            <p>Students: ${data.statistics.students}</p>
            <p>Faculty: ${data.statistics.faculty}</p>
            <p>Courses: ${data.statistics.courses}</p>
            <p>Placement Rate: ${data.statistics.placementRate}</p>
        </div>
    `;
}

function aboutdata(data) {

    mainframe.innerHTML = "";
    mainframe.innerHTML = `
        <div>

            <h1>${data.name}</h1>

            <p>
                <b>Established:</b>
                ${data.established}
            </p>

            <p>
                <b>Located:</b>
                ${data.location}
            </p>

            <p>
                <b>Total Students:</b>
                ${data.totalStudents}
            </p>

            <p>
                <b>Active Batches:</b>
                ${data.activeBatches}
            </p>

            <p>
                <b>Placements:</b>
                ${data.placements}
            </p>

        </div>
    `;
}

function coursedata(data) {

    mainframe.innerHTML =
        `
        <br>
        <div id="coursesdata">
    <a href="#"id="bca">BCA</a><br>
    <a href="#"id="btech">B.Tech CSE</a><br>
    <a href="#"id="aiml">B.Tech AI & ML</a><br>
    <a href="#"id="bba">BBA</a><br>
    </div>`

}

function displaycourse(course) {

    mainframe.innerHTML =
        ` <div>
            <h2>${course.name}</h2>
             <p>${course.id}</p>
             <p>${course.duration}</p>
             <p>${course.seats}</p>
             <p>${course.eligibility}</p>
             <p>${course.department}</p>
         </div>`
}

function placementdata(data) {

    let recruiters = data.topRecruiters.map((rec) => {

        return `
            <tr>
                <td>${rec.name}</td>
                <td>${rec.package}</td>
                <td>${rec.studentsHired}</td>
            </tr>
        `;

    }).join("");


    let placementProcess = data.placementProcess.map((process) => {

        return `
            <li>${process}</li>
        `;

    }).join("");


    let trainingPrograms = data.trainingPrograms.map((training) => {

        return `
            <li>${training}</li>
        `;

    }).join("");


    mainframe.innerHTML = `
        <div>

            <h1>Placement Information</h1>

            <h2>Placement Statistics</h2>

            <p>
                <b>Placement Rate:</b>
                ${data.placementRate}
            </p>

            <p>
                <b>Academic Year:</b>
                ${data.academicYear}
            </p>

            <p>
                <b>Students Eligible:</b>
                ${data.studentsEligible}
            </p>

            <p>
                <b>Students Placed:</b>
                ${data.studentsPlaced}
            </p>

            <p>
                <b>Companies Visited:</b>
                ${data.companiesVisited}
            </p>

            <p>
                <b>Highest Package:</b>
                ${data.highestPackage}
            </p>

            <p>
                <b>Average Package:</b>
                ${data.averagePackage}
            </p>

            <p>
                <b>Lowest Package:</b>
                ${data.lowestPackage}
            </p>


            <h2>Top Recruiters</h2>

            <table border="1">

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
                ${placementProcess}
            </ol>


            <h2>Training Programs</h2>

            <ul>
                ${trainingPrograms}
            </ul>

        </div>
    `;
}

function contactdata(data) {

    mainframe.innerHTML = `
        <div>

            <h1>Contact Us</h1>

            <h3>College Name</h3>
            <p>${data.collegeName}</p>

            <h3>Address</h3>
            <p>${data.address}</p>

            <h3>Phone</h3>
            <p>${data.phone}</p>

            <h3>Email</h3>
            <p>${data.email}</p>

        </div>
    `;
}

function facilitydata(data) {

    let facilities = data.map((facility) => {

        let facilityList = facility.facilities.map((item) => {

            return `<li>${item}</li>`;

        }).join("");

        return `
            <div>

                <h2>${facility.name}</h2>

                <p>
                    <b>ID:</b> ${facility.id}
                </p>

                <p>
                    <b>Description:</b> ${facility.description}
                </p>

                <p>
                    <b>Capacity:</b> ${facility.capacity}
                </p>

                <p>
                    <b>Timings:</b> ${facility.timings}
                </p>

                <h4>Facilities:</h4>

                <ul>
                    ${facilityList}
                </ul>

            </div>

            <hr>
        `;

    }).join("");

    mainframe.innerHTML = `
        <div>

            <h1>College Facilities</h1>

            ${facilities}

        </div>
    `;
}

function studentsdata(data) {

    let batchData = {};

    data.students.forEach((student) => {

        let batch = student.batch;

        if (!batchData[batch]) {

            batchData[batch] = {
                course: student.course,
                students: 0
            };

        }

        batchData[batch].students++;
    });


    let batches = Object.keys(batchData).map((batch) => {

        return `
            <tr>
                <td>${batch}</td>
                <td>${batchData[batch].course}</td>
                <td>${batchData[batch].students}</td>
            </tr>
        `;

    }).join("");


    mainframe.innerHTML = `

        <h1>Student Details</h1>

        <h3>
            Total Students: ${data.summary.total_students}
        </h3>

        <h3>Active Batches</h3>

        <table border="2">

            <thead>
                <tr>
                    <th>Batch</th>
                    <th>Course</th>
                    <th>Students</th>
                </tr>
            </thead>

            <tbody>
                ${batches}
            </tbody>

        </table>

        <br>

        <h2>Student Registration Form</h2>

        <table border="2">

            <tr>
                <td>Student ID</td>
                <td>
                    <input id="id" type="text">
                </td>
            </tr>

            <tr>
                <td>Name</td>
                <td>
                    <input id="name" type="text">
                </td>
            </tr>

            <tr>
                <td>Email</td>
                <td>
                    <input id="email" type="email">
                </td>
            </tr>

            <tr>
                <td>Phone</td>
                <td>
                    <input id="phone" type="text">
                </td>
            </tr>

            <tr>
                <td>Course</td>
                <td>
                    <input id="course" type="text">
                </td>
            </tr>

            <tr>
                <td>Gender</td>
                <td>
                    <input id="gender" type="text">
                </td>
            </tr>

            <tr>
                <td></td>
                <td>
                    <button id="submitStudent" type="button">
                        Submit
                    </button>
                </td>
            </tr>

        </table>
    `;


    let submit = document.getElementById('submitStudent');
    let studentid = document.getElementById('id');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let course = document.getElementById('course');
    let gender = document.getElementById('gender');


    submit.addEventListener("click", () => {
        let data = {
            "student_id": studentid.value,
            "name": name.value,
            "email": email.value,
            "phone": phone.value,
            "course": course.value,
            "batch": "2024-2028",
            "semester": 1,
            "year": 1,
            "gender": gender.value,

        };

        fetch('http://localhost:3300/students-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

            .then(result => {
                console.log(result);
                studentid.value = "";
                name.value = "";
                email.value = "";
                phone.value = "";
                course.value = "";
                gender.value = "";
            })
    })


}

document.addEventListener("click", (e) => {

    e.preventDefault();

    const id = e.target.id;

    console.log("Clicked:", id);
    if (id != 'submitStudent') {

        if (id == "bca" || id == "btech" || id == "aiml" || id == "bba") {
            fetch(`http://localhost:3300/courses/${id}`)
                .then((res) => {
                    console.log("Status:", res.status);

                    if (!res.ok) {
                        throw new Error("Server error: " + res.status);
                    }

                    return res.json();
                })
                .then((data) => {
                    displaycourse(data);
                    //         mainframe.innerHTML =
                    //             ` <div>
                    //     <h2>${course.name}</h2>
                    //      <p>${course.id}</p>
                    //      <p>${course.duration}</p>
                    //      <p>${course.seats}</p>
                    //      <p>${course.eligibility}</p>
                    //      <p>${course.department}</p>
                    //  </div>`
                })

        }
        else {
            
            fetch(`http://localhost:3300/${id}`)
                .then((res) => {

                    console.log("Status:", res.status);

                    if (!res.ok) {
                        throw new Error("Server error: " + res.status);
                    }

                    return res.json();
                })
                .then((data) => {

                    console.log("Data:", data);

                    if (id === "home") {
                        homedata(data);
                    }
                    else if (id === "about") {
                        aboutdata(data);
                    }

                    else if (id === "courses") {
                        coursedata(data);
                    }

                    else if (id == "placement") {
                        placementdata(data);
                    }

                    else if (id == "contact") {
                        contactdata(data);
                    }
                    else if (id == "facilities") {
                        facilitydata(data);
                    }
                    else if (id == "students") {
                        studentsdata(data);
                    }

                })
                .catch((error) => {
                    console.error("Error:", error);
                });

        }
    }

});