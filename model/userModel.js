const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'Username is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
    },
    phone:{
        type:String,
        required:[true, 'phone number is required']
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    userType:{
        type:String,
        required:[true],
        default:'client',
        enum:['client', 'admin', 'resOwner', 'driver'], 

    }

},{timestamps:true})

//export

module.exports = mongoose.model('User', userSchema);