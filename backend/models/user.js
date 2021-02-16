const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password : {
        type :String , 
        required :true
    } , 
    name : {
        type :String , 
        required :true
    },
    image : String ,
    role : String 
} , {timestamps :true})


const User = mongoose.model('user' , userSchema)
module.exports = User