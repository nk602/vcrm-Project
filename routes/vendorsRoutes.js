const express = require("express");
const Router = express.Router();
const VendorsFormcontroller=require("../controllers/vendorsController");
// Router.post("/register-enquiry/", enquiryFormcontroller.createEnquiryform);
Router.get("/vendors/",VendorsFormcontroller.ListOfVendors);
module.exports=Router;