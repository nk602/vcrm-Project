const express = require("express");
const Router = express.Router();
const adminController = require("../../controllers/adminController");
const protectRoute = require("../../auth/checkAuth");
const protectRoute2=require("../../auth/checkAuthMiddleware")
// const authMiddleware = require('./path/to/authMiddleware'); 
// Router.get("/",async(req,res)=>{
//     res.send("Admin apis is running")
// })
//Login FORM
Router.get("/",adminController.get_admin_login);
Router.post("/create",adminController.adminCreate);
Router.post("/login",adminController.adminLogin);
Router.get("/logout", adminController.adminLogout);
//Router.post("/dashboard", adminController.admin_login);
//Router.get("/login", adminController.adminLogout);

module.exports = Router;
