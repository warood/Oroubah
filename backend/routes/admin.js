const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Appointment = require("../models/appointment");
const Classes = require("../models/class");
const bcrypt = require("bcrypt");


// 1. -------------- View all users --------------
router.get("/users", (req, res) => {

    User.find()
      .then((users) => {
        res.json({ users: users});
      })
      .catch((err) => res.json({ msg: err }));

});

// 2. -------------- Add new class --------------
router.post("/class/new", (req, res) => {

    const newClass = {
        category : req.body.category, 
        target : req.body.target ,
        description : req.body.description ,
        image : req.params.image
    };

    Classes.create(newClass)
    .then(classes => {
        res.json({ msg: "class has been added successfully", classes: classes });
    })
    .catch((err) => res.json({ msg: err }));

  });

// 3. -------------- Edit user info --------------
router.put("/users/:id", (req, res) => {

  let updateUser = {
    name: req.body.name,
    image: req.body.image,
    password: req.body.password,
  };

  var salt = bcrypt.genSaltSync(10);
  updateUser.password = bcrypt.hashSync(req.body.password, salt);

  User.findByIdAndUpdate(req.params.id,{ $set: updateUser },
    {
      new: true,
    }
  )
  .then(user =>
    {
      res.json({ msg: "User has ben Updated", user: user });
    })
  .catch((err) => res.json({ msg: err }));

  })

// 4. -------------- View all appointments --------------
router.get("/appointments", (req, res) => {

  Appointment.find()
    .then((appointments) => {
      res.json({ appointments: appointments});
    })
    .catch((err) => res.json({ msg: err }));
    
});

// 5. -------------- Approve the appointment --------------
router.put("/appointments/:id", (req, res) => {

  Appointment.findOneAndUpdate({_id: req.params.id}, {status: 'approved'} )
  .then(newapp =>
    {
      res.json({ msg: "appointment has been accepted", appointment: newapp });
    })
  .catch((err) => res.json({ msg: err }));

  })

// 6. -------------- cancel an appointment --------------
router.delete("/appointments/:id", (req, res) => {

    const appointmentId = req.params.id
    Appointment.findByIdAndDelete(appointmentId)
        .then((appointment) => {
            res.json({ msg: "deleted successfully", appointment: appointment });
        })
    .catch((err) => res.json({ msg: err }));

});


//show all classes
router.get("/classes", (req, res) => {

  Classes.find()
    .then((classes) => {
      res.json({ classes: classes});
    })
    .catch((err) => res.json({ msg: err }));

});


module.exports = router;
