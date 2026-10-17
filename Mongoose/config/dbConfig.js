const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        const com = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected succesfully");
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connectDB;