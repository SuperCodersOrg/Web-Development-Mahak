const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
const data = JSON.parse(fs.readFileSync('task.json', 'utf8'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.send();
        return;
    }

    next();
});

let tasks = [];

app.get('/loadtask', (req, res) => {
    res.json(data);
});

app.post('/addtask', (req, res) => {
    // let data = JSON.parse(fs.readFileSync('task.json', 'utf8'));

    let task = req.body;

    data.push(task);

    fs.writeFileSync(
        "task.json",
        JSON.stringify(data, null, 2)
    );

    res.json(task);
});

app.delete('/deletetask/:id', (req, res) => {
    let taskid = Number(req.params.id);

    let filterdata = data.find(filter => {
        return filter.id === taskid;
    });
    if (!filterdata) {
        return res.status(404).json({
            message: "Task not found"
        });
    }
    filterdata.isdeleted = true;
    fs.writeFileSync(
        "task.json",
        JSON.stringify(data, null, 2)
    );
    res.send("successfully deleted");
});

app.put('/updatetask/:id', (req, res) => {
    let id = Number(req.params.id);

    let idData = data.find((d) => {
        return d.id === id;
    });

    if (!idData) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    let task = req.body;

    idData.title = task.title;
    idData.desc = task.desc;

    fs.writeFileSync(
        "task.json",
        JSON.stringify(data, null, 2)
    );

    res.json(idData);
});

app.patch('/completed/:id',(req,res)=>{
     let taskid = Number(req.params.id);

    let filterdata = data.find(filter => {
        return filter.id === taskid;
    });

    if (!filterdata) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    filterdata.completed = !filterdata.completed;

    fs.writeFileSync(
        "task.json",
        JSON.stringify(data, null, 2)
    );

    res.send(data);
})

app.listen(port, () => {
    console.log("Running on live server : ", port)
})
