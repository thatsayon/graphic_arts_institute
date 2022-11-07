const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {
        type:String, 
        required:true
    },
    lastname : {
        type:String,
        required:true
    },
    boardroll : {
        type:Number,
        required:true,
        unique:true
    },
    semester : {
        type:String, 
        required:true
    },
    gender : {
        type:String,
        required:true
    },
    shift : {
        type:String,
        required:true
    },
    department : {
        type:String, 
        required:true
    },
    password : {
        type:String, 
        required:true
    }
})

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;