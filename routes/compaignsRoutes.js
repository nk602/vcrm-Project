const express = require("express");
const Router = express.Router();
const compaignsFormcontroller=require("../controllers/compaignsController")
// Router.post("/register-enquiry/", enquiryFormcontroller.createEnquiryform);
Router.get("/compaigns/",compaignsFormcontroller.ListCompaigns);
Router.get("/dashboard/user-compaign/",compaignsFormcontroller.ListAgentCompaigns);
Router.post("/Add-compaign",compaignsFormcontroller.Addcompaign);
Router.post("/Add-compaign-name",compaignsFormcontroller.AddCompaignName);
Router.post("/listActivityByCompaign",compaignsFormcontroller.listActivityLogByCompaignId);
module.exports = Router;