const express = require("express");
const Router = express.Router();
const userController = require("../../controllers/userController");
const path = require("path");
const multer = require("multer");
const protectRoute = require("../../auth/checkAuth");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname);
  },
});
const upload = multer({ storage: storage });
Router.get("/", userController.get_user_login);
Router.post("/register-user", userController.userCreate);
Router.post("/userLogin/", userController.userLogin);
// Router.post("/employeeLogin/", userController.employeeLogin);
Router.post("/registerEmployee",userController.registerEmployee);
Router.get("/logout", userController.userLogout);
module.exports = Router;
