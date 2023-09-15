const express = require("express");
const Router = express.Router();
const enquiryFormcontroller = require("../controllers/enquiryController");
const excel = require("exceljs");
const multer = require("multer");
const path = require("path");
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
// Router.get("/downloadEnquiryFormExcel",enquiryFormcontroller.downloadEnquiryExcel);
Router.post("/register-enquiry/", enquiryFormcontroller.createEnquiryform);
Router.get("/enquiry/", enquiryFormcontroller.getEnquiryForm);
Router.post(
  "/uploadEnquiryExcel",
  upload.single("filePath"),
  enquiryFormcontroller.uploadEnquiryExcel
);
Router.get(
  "/downloadEnquiryFormExcel",
  enquiryFormcontroller.downloadEnquiryExcel
);
module.exports = Router;
