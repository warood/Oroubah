const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Appointment = require("../models/appointment");
const Classes = require("../models/class");


// 1. -------------- View own profile with appointments --------------
router.get('/:id/profile', (req, res) => {

    User.findById(req.params.id)
    .then(user => {
        Appointment.find({'user': user.id}).populate("class")
        .then(userAppointments => {
        res.json({ user: user , userAppointments: userAppointments });
        })
        .catch((err) => res.json({ msg: err }));
    })
    .catch((err) => res.json({ msg: err }));
})

router.get(`/show` , (req, res) => {

  Classes.findById(req.params.id, function (err, result) {

    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

   


// 2. -------------- Edit own profile --------------
router.put("/:id/profile/edit", (req, res) => {

  //let updateProfile ={}


  if (req.body.password) {
  bcrypt.hash(req.body.password, 10, ((err, hash) => {
    req.body.password = hash;
    User.findByIdAndUpdate(req.params.id, req.body , { new: true })
      .then(user => res.json({ edit: user }))
  }))
} else {
  User.findByIdAndUpdate(req.params.id, req.body , { new: true })
    .then(user => res.json({ edit: user }))
}



});

// 3. -------------- Book an appointment --------------
router.post("/:id/appointments/new", (req, res) => {
        const newAppointment = {
            date : req.body.date, 
            period : req.body.period ,
            numOfPeople : req.body.numOfPeople ,
            user : req.params.id,
            status : 'pending',
            class: req.body.class 
        };
     
    
        Appointment.create(newAppointment)
        .then(appointment => {
            res.json({ msg: "appointment has been added successfully", appointment: appointment });
        })
        .catch((err) => res.json({ msg: err }));

    });


// 4. -------------- Edit an appointment --------------
router.put("/:id/appointments/:aid", (req, res) => {

    const updateAppointment = {
        date : new Date(), // TODO: will be changed depending on user entry
        period : req.body.period ,
        numOfPeople : req.body.numOfPeople ,
        user : req.params.id,
    };

    Appointment.findByIdAndUpdate(req.params.aid , updateAppointment)
    .then(appointment => {
        res.json({ msg: "appointment has been edited successfully", appointment: appointment });
    })
    .catch((err) => res.json({ msg: err }));

  });

// 5. -------------- Cancel an appointment --------------
router.delete("/:id/appointments/:aid", (req, res) => {

    Appointment.findByIdAndDelete(req.params.aid)
        .then((appointment) => {
            res.json({ msg: "deleted successfully", appointment: appointment });
        })
        .catch((err) => res.json({ msg: err }));

  });


module.exports = router;