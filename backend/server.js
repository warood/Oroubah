require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')

AdminBro.registerAdapter(require('admin-bro-mongoose'))
// const User = mongoose.model('User', { name: String, email: String, surname: String })

mongoose.connect(
  process.env.MongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true  },
  () => {
    console.log("mongoDb is connect");
  }
);

const User = require("./models/user");
const Appointment = require("./models/appointment");
const Classes = require("./models/class");

const adminBro = new AdminBro({
  resources: [User,Appointment, Classes],
  rootPath: '/admin',
})
const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/dashboard", require("./routes/admin"));

app.listen(PORT, () => console.log(`server running in ${PORT}`));

const path = require('path')
app.use(express.static(path.join(__dirname , "build")));
app.get("*" , (req,res ) =>{
res.sendFile(path.join(__dirname , "build" , "index.html"))
})