const express = require('express');
let post = 3000;

const app = express();
app.use(express.json());

let sessionData = {

}

app.listen(port,()=>{
    console.log("Server running at : ",port)
})