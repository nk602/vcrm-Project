const express = require('express');
const Router = express.Router();
const dashboardController = require("../controllers/dashboardcontroller");


Router.get("/",async(req,res)=>{
    res.send("Dashboard apis is running")
})
Router.get("/employees",dashboardController.ListEmployee);
Router.get("/register-employee",dashboardController.get_register_employee);
Router.post("/register-employee",dashboardController.createEmplyee)

// Route to handle the employee deletion
Router.post("/delete-employee/:id",dashboardController.delete_emplyee)

// Route to render the update-employee.ejs template
Router.get("/update-employee/",dashboardController.get_update_employee)
Router.post("/update-employee/:id",dashboardController.update_employee)


module.exports = Router 