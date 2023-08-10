const express = require("express");
const Router = express.Router();
const enquiryFormcontroller=require("../controllers/enquiryController")
Router.post("/register-enquiry/", enquiryFormcontroller.createEnquiryform);
module.exports = Router;