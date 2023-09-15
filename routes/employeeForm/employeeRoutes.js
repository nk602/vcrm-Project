const express = require("express");
const multer = require("multer");
const path = require("path");
const employeeFormController = require("../../controllers/employeeController");
const protectRoute = require("../../auth/checkAuth");
const Router = express.Router();
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
//Employee Form
Router.get("/employees",protectRoute,employeeFormController.ListEmployee);
Router.get("/employee-profile/:id", employeeFormController.ListEmployeeProfile);
Router.get("/register-employee", employeeFormController.get_register_employee);
Router.post(
  "/register-employee",
  upload.fields([
    { name: "adharImage" },
    { name: "panImage" },
    { name: "chequeImage" },
    { name: "drivingLicenseImage" },
  ]),
  employeeFormController.createEmplyee
);
//update employee
Router.get(
  "/register-employee/:id",
  employeeFormController.get_update_employee
);
// // Route to render the update-employee.ejs template
Router.get("/update-employee/:id", employeeFormController.get_update_employee);
Router.post(
  "/update-employee/:id",
  upload.fields([
    { name: "adharImage" },
    { name: "panImage" },
    { name: "chequeImage" },
    { name: "drivingLicenseImage" },
  ]),
  employeeFormController.update_employee
);
// // Route to handle the employee deletion
Router.post("/delete-employee/:id", employeeFormController.delete_emplyee);
module.exports = Router;
