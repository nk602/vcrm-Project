const express = require("express");
const Router = express.Router();
const dashboardController = require("../controllers/dashboardcontroller");
const multer = require("multer");
const path = require('path');
// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueFileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueFileName);
  }
});

const upload = multer({ storage: storage });

// Router.get("/", async (req, res) => {
//   res.send("Dashboard apis is running");
// });

Router.get("/",dashboardController.getAdmindashboard)
Router.get("/employees", dashboardController.ListEmployee);
Router.get("/register-employee", dashboardController.get_register_employee);
Router.post("/register-employee", 
upload.single('adharImage'),
dashboardController.createEmplyee);
//update employee
Router.get("/register-employee/:id", dashboardController.get_update_employee);

// Route to handle the employee deletion
Router.post("/delete-employee/:id", dashboardController.delete_emplyee);

// Route to render the update-employee.ejs template
Router.get("/update-employee/:id", dashboardController.get_update_employee);
Router.post("/update-employee/:id", dashboardController.update_employee);

module.exports = Router;
