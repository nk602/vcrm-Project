const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Parser } = require('json2csv');
const multer = require('multer');
const json2csv = require('json2csv');
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({ storage });
module.exports.uploadEnquiryExcel=async(req,res)=>{
    console.log("uploadEnquiryExcel",req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
    
      const excelData = req.file.buffer.toString(); 
    try {
        // Use json2csv to convert Excel data to JSON
        const jsonData = await excelToJSON(excelData);
    
        // Process the JSON data and store it in the database using Prisma
        for (const record of jsonData) {
          await prisma.employeeForm.create({ data: record });
        }
    
        res.send('File uploaded, converted to JSON, and stored in the EmployeeForm table.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error handling the file.');
      }
}

module.exports.downloadEnquiryExcel = async (req, res) => {
  try {
    const getEnquiryCsvdata = await prisma.enquiryForm.findMany();
    // console.log(getEnquiryCsvdata);
    let enquiryData = [];
    getEnquiryCsvdata.forEach((element) => {
      const { firstName, email } = element;
      enquiryData.push({ "First Name":firstName,"EmailId":email });
    });

    if (enquiryData.length === 0) {
        return res.status(404).send({ message: "No data available" });
      }
    //  console.log(enquiryData);
    const csvFields = ["Name", "email"];
    const csvParser = new Parser({ csvFields });
    const csvData = csvParser.parse(enquiryData);
    console.log(csvData);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=EnquiryManagement.csv"
    );
    // res.status(200).end(csvData);
    res.status(200).send(csvData);
  } 
 
 
  catch (error) {
    res.status(500).send({ message: "Could not download the file!" });
  }
};
