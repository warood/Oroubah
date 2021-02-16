const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    date :Date ,
    period : String ,
    numOfPeople : Number ,
    status: String ,
    user :{type : mongoose.Schema.Types.ObjectId , ref : 'user' },
    class :{type : mongoose.Schema.Types.ObjectId , ref : 'class' }
} , {timestamps :true})

const Appointment = mongoose.model('appointment' , appointmentSchema)
module.exports = Appointment