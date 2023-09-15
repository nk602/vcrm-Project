const express = require("express");
const Router = express.Router();
const LeadsFormcontroller=require("../controllers/leadsController");
// // Router.post("/register-enquiry/", enquiryFormcontroller.createEnquiryform);
// Router.get("/vendors/",VendorsFormcontroller.ListOfVendors);
Router.post("/register-leads/", LeadsFormcontroller.createLeadsForm);
Router.get("/leads-details",LeadsFormcontroller.userLeadsDetails)
module.exports = Router;