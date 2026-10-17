const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type:string,
        required : true,
        trim : true
    },
    email :{
        type :string,
        unique : [ true,"Email already exists"],
        required :true,
        trim : true,
        lowercase : true
    },
    password :{
        type : string,
        required : true
    }
},{
    timestamps : true

});
module.exports = mongoose.model('User',userSchema);