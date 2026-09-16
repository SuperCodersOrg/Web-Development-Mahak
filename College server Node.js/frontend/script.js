let mainframe = document.getElementById("mainframe");

function homepage() {
    mainframe.innerHTML = `
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
        <nav >
           <!-- <a href="http://localhost:3300/">Home</a>
            <a href="http://localhost:3300/about">About</a>
            <a href="http://localhost:3300/courses">Courses</a>
            <a href="http://localhost:3300/students">Students details</a>
            <a href="http://localhost:3300/contact">Contact Details</a>
            <a href="http://localhost:3300/facilities">Facilities</a>
            <a href="/placement" id="placement">Placement</a> -->

            <nav id="navigationbar">
            
            <a href="/" >Home</a>
            <a href="/about" id="about">About</a>
            <a href="/courses" id="courses">Courses</a>
            <a href="/students" id="students">Students details</a>
            <a href="/contact" id="contact">Contact Details</a>
            <a href="/facilities" id="facality">Facilities</a>
            <a href="/placement" id="placement" >Placement</a>

        </nav>

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
         `


}

function placement(data) {
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


    mainframe.innerHTML = `

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
                `
}



fetch('/')
    .then(response => {
        console.log(response);
        homepage();
    })
// mainframe.addEventListener

// let navigationbar = document.getElementById("navigationbar");

document.getElementById("navigationbar").addEventListener("click",(e)=>{

    if(e.target.id == "placement"){
    e.preventDefault();

        fetch('http://localhost:3300/placement')
        .then(response => {

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            placement(data);
        })

    }
    // else if(e.target.id == "about")
}) 


// let placementancor = document.getElementById("placement");

// placementancor.addEventListener("click", (e) => {
//     e.preventDefault();
//     fetch('/placement')
//         .then(response => {

//             if (!response.ok) {
//                 throw new Error("HTTP error: " + response.status);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             placement(data);
//         })
// // })



// fetch('/about')
//     .then(response => {

//         if (!response.ok) {
//             throw new Error("HTTP error: " + response.status);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//         about(data);
//     })
