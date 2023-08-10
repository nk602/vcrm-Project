const express = require("express");
const Router = express.Router();
const dashboardController = require("../controllers/dashboardcontroller");
const protectRoute = require("../auth/checkAuth");
const multer = require("multer");
const path = require("path");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/"); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

// Router.get("/", async (req, res) => {
//   res.send("Dashboard apis is running");
// });

Router.get("/", protectRoute, dashboardController.getAdmindashboard);
Router.get("/employees", protectRoute, dashboardController.ListEmployee);
Router.get("/register-employee", dashboardController.get_register_employee);
Router.post(
  "/register-employee",
  upload.fields([
    { name: "adharImage" },
    { name: "panImage" },
    { name: "chequeImage" },
    { name: "drivingLicenseImage" },
  ]),
  dashboardController.createEmplyee
);
//update employee
Router.get("/register-employee/:id", dashboardController.get_update_employee);

// Route to handle the employee deletion
Router.post("/delete-employee/:id", dashboardController.delete_emplyee);

// Route to render the update-employee.ejs template
Router.get("/update-employee/:id", dashboardController.get_update_employee);
Router.post(
  "/update-employee/:id",
  upload.fields([
    { name: "adharImage" },
    { name: "panImage" },
    { name: "chequeImage" },
    { name: "drivingLicenseImage" },
  ]),
  dashboardController.update_employee
);
///?///?////???
module.exports = Router;
