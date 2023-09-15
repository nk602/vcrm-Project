const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");
const excel = require("exceljs");
const multer = require("multer");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
module.exports.createEnquiryform = async (req, res) => {
  console.log("ADD11111", req.body);
  try {
    const enquiry = await prisma.enquiryForm.create({
      data: req.body,
    });

    //  return res.status(200).json({
    //    status: "success",
    //   message: "Enquiry form created successfully...",
    //   // data: enquiry,
    //  });
    res.redirect("/admin/dashboard/enquiry");
  } catch (error) {
    return res
      .status(404)
      .json({ status: "error", message: error.message, data: {} });
  }
};
module.exports.getEnquiryForm = async (req, res) => {
  const page = req.query.page || 1; // Get the requested page from the query parameter (default to 1)
  const pageSize = 5; // Set the number of items per page (you can adjust this as needed)
  const skip = (page - 1) * pageSize; // Calculate the number of items to skip
  const enquiries = await prisma.enquiryForm.findMany({
    skip: skip,
    take: pageSize,
  });
  // You can also calculate the total number of dispositions in the database for pagination
  const totalCount = await prisma.enquiryForm.count();

  // Calculate the total number of pages based on the total count and page size
  const totalPages = Math.ceil(totalCount / pageSize);
  // console.log("enquiries", enquiries);
  res.render("enquiry-form", { enquiries, currentPage: page, totalPages });
};
// module.exports.uploadEnquiryExcel = async (req, res) => {
//   try {
//     // Use the 'upload' middleware to handle the file upload
//     upload.single('excelFile')(req, res, (err) => {
//       if (err) {
//         return res.status(400).json({
//           status: 'error',
//           message: err.message,
//           data: {},
//         });
//       }

//       // File upload was successful, you can access the uploaded file details via req.file
//       const uploadedFilePath = req.file.path;
//       // Handle the uploaded file as needed (e.g., process the Excel file)

//       return res.status(200).json({
//         status: 'success',
//         message: 'File uploaded successfully',
//         data: { filePath: uploadedFilePath },
//       });
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 'error',
//       message: 'An error occurred while uploading the file.',
//       data: {},
//     });
//   }
// };
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    // Generate a unique filename using a timestamp and a random string
    const uniqueFilename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}${extname}`;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage });
module.exports.uploadEnquiryExcel = async (req, res) => {
  console.log("fileLog", req.file);
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded.",
        data: {},
      });
    }

    // if (req.file) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "file already exists!",
    //     data: {},
    //   });
    // }
    // if (req.file == undefined) {
    //   return res.status(400).send("Please upload a CSV file!");
    // }
    // Process the uploaded Excel file and populate the database
    const filePath = req.file.path;
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const firstName = row.getCell(1).text;
      // const email = row.getCell(2).text;
      const lastName = row.getCell(2).text;
      const email = row.getCell(3).text;
      const phoneNumber = row.getCell(4).text;
      const totalWorkExperience = row.getCell(5).text;
      const highestLevelOfEducation = row.getCell(6).text;
      const graduationYear = row.getCell(7).text;
      const jobTitle = row.getCell(8).text;
      const companyName = row.getCell(9).text;
      const utmCompaign = row.getCell(10).text;
      const englishLanguage = row.getCell(11).text;
      const state = row.getCell(12).text;
      const city = row.getCell(13).text;
      const courseid = row.getCell(14).text;
      const utmTerm = row.getCell(15).text;
      const utmMedium = row.getCell(16).text;
      const utmSource = row.getCell(17).text;

      // Save the data to the database using Prisma
      await prisma.enquiryForm.create({
        data: {
          firstName,
          email,
          lastName,
          phoneNumber,
          totalWorkExperience,
          highestLevelOfEducation,
          graduationYear,
          jobTitle,
          companyName,
          utmCompaign,
          englishLanguage,
          state,
          city,
          courseid,
          utmTerm,
          utmMedium,
          utmSource,
        },
      });
    }

    // return res.status(200).json({
    //   status: 'success',
    //   message: 'Excel data uploaded and saved to the database.',
    //   data: {},
    // });
    res.redirect("/admin/dashboard/enquiry");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while processing the file.",
      data: {},
    });
  }
};
module.exports.downloadEnquiryExcel = async (req, res) => {
  try {
    // Fetch data from your database using Prisma
    const enquiryFormData = await prisma.enquiryForm.findMany(); // Modify this query as needed

    // Create a new Excel workbook and worksheet
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("EnquiryForm Data");

    // Add headers to the worksheet
    worksheet.addRow([
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Total Work Experience",
      "Graduation Year",
      "Job Title",
      "Company Name",
      "Utm Compaign",
      "English Language",
      "City",
      "State",
      "Course ID",
      "Utm Term,",
      // Utm MediaKeyStatusMap,
      "Utm Medium",
      // Utm MediaKeyStatusMap,
      "Utm Source",

      // entry.companyName,
      //     entry.utmCompaign,
      //     entry.englishLanguage,
      //     entry.city,
      //     entry.state,
      //     entry.courseid,
      //     entry.utmTerm,
      //     entry.utmMedium,
      //     entry.utmSource,

      /* ... add other fields */
    ]);

    // Add data from the database to the worksheet
    enquiryFormData.forEach((entry) => {
      worksheet.addRow([
        entry.firstName,
        entry.lastName,
        entry.email,
        entry.phoneNumber,
        entry.totalWorkExperience,
        entry.highestLevelOfEducation,
        entry.graduationYear,
        entry.jobTitle,
        entry.companyName,
        entry.utmCompaign,
        entry.englishLanguage,
        entry.city,
        entry.state,
        entry.courseid,
        entry.utmTerm,
        entry.utmMedium,
        entry.utmSource,

        /* ... add other fields */
      ]);
    });

    // Set up the response headers for Excel file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=enquiryForm.xlsx"
    );

    // Send the Excel file as the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while generating the Excel file.",
      data: {},
    });
  }
};
// router.get('/downloadExcelfile', async (req, res) => {
//   try {
//     // Fetch data from your database using Prisma
//     const enquiryFormData = await prisma.enquiryForm.findMany(); // Modify this query as needed

//     // Create a new Excel workbook and worksheet
//     const workbook = new excel.Workbook();
//     const worksheet = workbook.addWorksheet('EnquiryForm Data');

//     // Add headers to the worksheet
//     worksheet.addRow(['First Name', 'Email', /* ... add other fields */]);

//     // Add data from the database to the worksheet
//     enquiryFormData.forEach((entry) => {
//       worksheet.addRow([
//         entry.firstName,
//         entry.email,
//         /* ... add other fields */
//       ]);
//     });

//     // Set up the response headers for Excel file download
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=enquiryForm.xlsx');

//     // Send the Excel file as the response
//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'An error occurred while generating the Excel file.',
//       data: {},
//     });
//   }
// });

// Define a function to generate and send the Excel file
// module.exports.downloadEnquiryExcel = async (res, data) => {
//   try {
//     // Create a new Excel workbook and worksheet
//     const workbook = new excel.Workbook();
//     const worksheet = workbook.addWorksheet('Sheet 1');

//     // Add headers to the worksheet
//     worksheet.addRow(['Name', 'Email']);

//     // Add data from the provided data array to the worksheet
//     data.forEach(item => {
//       worksheet.addRow([item.name, item.email]);
//     });

//     // Set up the response headers for Excel file download
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');

//     // Generate the Excel file buffer
//     const buffer = await workbook.xlsx.writeBuffer();

//     // Load your EJS template
//     const ejsTemplate = fs.readFileSync('views/excelTemplate.ejs', 'utf8');

//     // Render the EJS template with the Excel data
//     const html = ejs.render(ejsTemplate, { buffer: buffer.toString('base64') });

//     // Send the HTML content as the response
//     res.send(html);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'An error occurred while generating the Excel file.',
//       data: {},
//     });
//   }
// };
