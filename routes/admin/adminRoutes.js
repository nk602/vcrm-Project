const express = require("express");
const Router = express.Router();
const adminController = require("../../controllers/adminController");
// Router.get("/",async(req,res)=>{
//     res.send("Admin apis is running")
// })
//Login FORM
Router.get("/", adminController.get_admin_login);
Router.post("/login", adminController.adminLogin);
Router.get("/logout", adminController.adminLogout);
//Router.post("/dashboard", adminController.admin_login);

//Router.get("/login", adminController.adminLogout);

module.exports = Router;
