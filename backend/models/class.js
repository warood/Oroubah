const mongoose = require('mongoose')


const classSchema = new mongoose.Schema({
    category : String,
    target : String, 
    description: String ,
    image : String
} , {timestamps :true})


const Classes = mongoose.model('class' , classSchema)
module.exports = Classes