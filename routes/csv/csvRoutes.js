const express=require("express");
const Router=express.Router();
const csvController=require("../../controllers/enquiryExcelController");
const upload=require("../../middleware/uploadExcel");
//Enquiry CSV
Router.get("/downloadCSV",csvController.downloadEnquiryExcel)
Router.post("/uploadCSV",csvController.uploadEnquiryExcel)
module.exports=Router;