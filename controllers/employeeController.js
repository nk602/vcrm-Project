const express = require("express");
const multer = require("multer");
const path = require("path");
const Joi = require("joi");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.ListEmployee = async (req, res) => {
  const page = req.query.page || 1; // Get the requested page from the query parameter (default to 1)
  const pageSize = 5; // Set the number of items per page (you can adjust this as needed)
  const skip = (page - 1) * pageSize; // Calculate the number of items to skip
  try {
    const employees = await prisma.employee.findMany();
    res.render("list-employee", { employees });
  } catch (error) {
    console.log("Error While fetching employeess", error);
  }
};
module.exports.ListEmployeeProfile = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id); // Parse the id from the route parameter

    // Find the employee by id
    const employees = await prisma.employee.findUnique({
      where: { id:employeeId },
    });
    res.render("employee-profile",
     { employees }
     );
  } catch (error) {
    console.error("Error while fetching employee", error);
    res.status(500).send("Internal Server Error");
  }
};
// module.exports.ListEmployeeProfile = async (req, res) => {
//     console.log("employee",req.body);
//     const page = req.query.page || 1; // Get the requested page from the query parameter (default to 1)
//     const pageSize = 5; // Set the number of items per page (you can adjust this as needed)
//     const skip = (page - 1) * pageSize; // Calculate the number of items to skip
//     try {
//       const employees = await prisma.employee.findUnique({
//         where:{
//             id:1
//         }
//       });
//       console.log(employees);
//       res.render("employee-profile",
//       { employees}
//       );
//     } catch (error) {
//       console.log("Error While fetching employeess", error);
//     }
//   };
module.exports.createEmplyee = async (req, res) => {
  console.log(req.files);
  console.log("addEmployeeLog", req.body);
  const adharImage = req.files["adharImage"];
  const panImage = req.files["panImage"];
  const chequeImage = req.files["chequeImage"];
  const drivingLicenseImage = req.files["drivingLicenseImage"];
  //console.log("adharImage",adharImage[0].path);
  //console.log("adharImage",adharImage.path);
  try {
    // Define validation schema for employee data
    const employeeSchema = Joi.object({
      firstName: Joi.string().min(4).max(100).required(),
      email: Joi.string().email().required(),
      lastName: Joi.string().required(),
      mobileNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
      dob: Joi.date().required(),
      gender: Joi.string().required(),
      currentAddressCountry: Joi.optional(),
      currentAddressState: Joi.optional(),
      currentAddressCity: Joi.optional(),
      currentAddressArea: Joi.optional(),
      currentAddressLane: Joi.optional(),
      currentAddressPinCode: Joi.optional(),
      sameAsCurrentAddress: Joi.optional(),
      permanentAddressCountry: Joi.optional(),
      permanentAddressState: Joi.optional(),
      permanentAddressCity: Joi.optional(),
      permanentAddressArea: Joi.optional(),
      permanentAddressLane: Joi.optional(),
      permanentAddressPinCode: Joi.optional(),
      companyName: Joi.optional(),
      department: Joi.optional(),
      designation: Joi.optional(),
      dateOfJoin: Joi.optional(),
      adharImage: Joi.optional(),
      adharNumber: Joi.string()
        .optional()
        .pattern(/^[0-9]{12}$/)
        .allow("")
        .messages({
          "string.pattern.base": "Aadhar number must be 12 digits.",
        }),
      panImage: Joi.optional(),
      PanNumber: Joi.string()
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
        .allow("") // Allow an empty string
        .messages({
          "string.pattern.base":
            "PAN number must be in the format of five uppercase letters, four digits, and one uppercase letter.",
        }),
      drivingLicenseImage: Joi.optional(),
      chequeImage: Joi.optional(),
      accountNumber: Joi.optional(),
      accountName: Joi.optional(),
      bankName: Joi.optional(),
      ifsc: Joi.optional(),
    });

    // let data = {};

    // // Check if the file path exists and is not blank
    // if (adharImage && adharImage !== "") {
    //   data.adharImage = adharImage;
    // }
    // if (panImage && panImage !== "") {
    //   data.panImage = panImage;
    // }
    // if (chequeImage && chequeImage !== "") {
    //   data.chequeImage = chequeImage;
    // }
    // if (drivingLicenseImage && drivingLicenseImage !== "") {
    //   data.drivingLicenseImage = drivingLicenseImage;
    // }
    // Validate the employee data using the schema
    const { error } = employeeSchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }
    ////adharImage[0] ? adharImage[0].filename : null;
    await prisma.employee.create({
      data: {
        ...req.body,
        adharImage: adharImage && adharImage[0] ? adharImage[0].filename : "",
        panImage: panImage && panImage[0] ? panImage[0].filename : "",
        chequeImage:
          chequeImage && chequeImage[0] ? chequeImage[0].filename : "",
        drivingLicenseImage:
          drivingLicenseImage && drivingLicenseImage[0]
            ? drivingLicenseImage[0].filename
            : "",
        // adharImage:data.adharImage,
        // panImage:data.panImage,
        // chequeImage:data.chequeImage,
        // drivingLicenseImage:data.drivingLicenseImage
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Employee created successfully...",
      data: {},
    });
  } catch (error) {
    return res
      .status(404)
      .json({ status: "error", message: error.message, data: {} });
  }
};
module.exports.get_register_employee = async (req, res) => {
  res.render("add-employee1");
};
// Route to handle the employee deletion
module.exports.delete_emplyee = async (req, res) => {
  console.log(req.body);
  const employeeId = parseInt(req.params.id);
  console.log("req.body", req.body);
  try {
    // Find the employee by id
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // Delete the employee
    await prisma.employee.delete({
      where: { id: employeeId },
    });

    res.redirect("/admin/dashboard/employees"); // Redirect back to the employee list
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee." });
  }
};
// Route to render the update-employee.ejs template
module.exports.get_update_employee = async (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  // const adharImage = req.files['adharImage'];
  // const panImage = req.files['panImage'];
  // const chequeImage = req.files['chequeImage'];
  // const drivingLicenseImage = req.files['drivingLicenseImage'];
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    console.log(employee);
    res.render("update-emplyee", { employee });
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee data." });
  }
};
module.exports.update_employee = async (req, res) => {
  console.log("update_employee", req.body);
  const adharImage = req.files["adharImage"];
  const panImage = req.files["panImage"];
  const chequeImage = req.files["chequeImage"];
  const drivingLicenseImage = req.files["drivingLicenseImage"];
// Create a JavaScript Date object for July 1, 2023
// Create a JavaScript Date object
var dateOfJoin = new Date(); // Replace this with your actual date

// Define an array for month names
var monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

// Get the day, month, and year components
var day = dateOfJoin.getDate();
var monthIndex = dateOfJoin.getMonth();
var year = dateOfJoin.getFullYear();

// Function to add ordinal suffix to the day
function getDayWithOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return day + "th";
  }
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
}

// Format the date as "1st January 2023"
var formattedDate = getDayWithOrdinalSuffix(day) + " " + monthNames[monthIndex] + " " + year;

console.log(formattedDate);

// Set the formatted date as the value of the input field
// document.querySelector('input[name="dateOfJoin"]').value = formattedDate;


  try {
    const aadharSchema = Joi.string()
      .pattern(/^[0-9]{12}$/) // Aadhar number format: 12 digits
      .allow(""); // Allow an empty string (optional)
    // Define a validation schema for PAN numbers using Joi
    const panSchema = Joi.string()
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/) // PAN number format
      .allow(""); // Allow an empty string (optional)
    // Validate the Aadhar number
    const { error: aadharValidationError } = aadharSchema.validate(
      req.body.adharNumber
    );

    if (aadharValidationError) {
      return res.status(400).json({
        status: "error",
        message: "Aadhar number must be 12 digits.",
        data: {},
      });
    }

    // Validate the PAN number
    const { error: panValidationError } = panSchema.validate(
      req.body.PanNumber
    );

    if (panValidationError) {
      return res.status(400).json({
        status: "error",
        message:
          "PAN number must be in the format of five uppercase letters, four digits, and one uppercase letter.",
        data: {},
      });
    }

    // //employeeId
    // const employeeId = parseInt(req.params.employeeId);

    // // // Define validation schema for updating employee data
    // const employeeSchema = Joi.object({
    //   // id: Joi.number().integer().positive(),      // Define fields that can be updated and their validation rules here
    //   firstName: Joi.string().min(4).max(100),
    //   email: Joi.string().email(),
    //   lastName: Joi.string(),
    //   mobileNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")),
    //   dob: Joi.date(),
    //   gender: Joi.string(),
    //   currentAddressCountry: Joi.optional(),
    //   currentAddressState: Joi.optional(),
    //   currentAddressCity: Joi.optional(),
    //   currentAddressArea: Joi.optional(),
    //   currentAddressLane: Joi.optional(),
    //   currentAddressPinCode: Joi.optional(),
    //   sameAsCurrentAddress: Joi.optional(),
    //   permanentAddressCountry: Joi.optional(),
    //   permanentAddressState: Joi.optional(),
    //   permanentAddressCity: Joi.optional(),
    //   permanentAddressArea: Joi.optional(),
    //   permanentAddressLane: Joi.optional(),
    //   permanentAddressPinCode: Joi.optional(),
    //   companyName: Joi.optional(),
    //   department: Joi.optional(),
    //   designation: Joi.optional(),
    //   dateOfJoin: Joi.optional(),
    //   adharImage: Joi.optional(),
    //   adharNumber: Joi.string()
    //     .pattern(/^[0-9]{12}$/)
    //     .allow("")
    //     .messages({
    //       "string.pattern.base": "Aadhar number must be 12 digits.",
    //     }),
    //   panImage: Joi.optional(),
    //   PanNumber: Joi.string()
    //     .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    //     .allow("")
    //     .messages({
    //       "string.pattern.base":
    //         "PAN number must be in the format of five uppercase letters, four digits, and one uppercase letter.",
    //     }),
    //   drivingLicenseImage: Joi.optional(),
    //   chequeImage: Joi.optional(),
    //   accountNumber: Joi.optional(),
    //   accountName: Joi.optional(),
    //   bankName: Joi.optional(),
    //   ifsc: Joi.optional(),
    // });

    // // Validate the employee data using the schema
    // const { error } = employeeSchema.validate(req.body);

    // if (error) {
    //   throw new Error(error.details[0].message);
    // }

    // Retrieve existing image filenames from the database or another source
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    // Define variables to store the existing image filenames
    const existingAdharImage = existingEmployee.adharImage || "";
    const existingPanImage = existingEmployee.panImage || "";
    const existingChequeImage = existingEmployee.chequeImage || "";
    const existingDrivingLicenseImage =
      existingEmployee.drivingLicenseImage || "";

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        // ...req.body,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        gender: req.body.gender,
        dob: req.body.dob,
        currentAddressCountry: req.body.currentAddressCountry,
        currentAddressState: req.body.currentAddressState,
        currentAddressCity: req.body.currentAddressCity,
        currentAddressArea: req.body.currentAddressArea,
        currentAddressLane: req.body.currentAddressLane,
        currentAddressPinCode: req.body.currentAddressPinCode,
        permanentAddressCountry: req.body.permanentAddressCountry,
        permanentAddressState: req.body.permanentAddressState,
        permanentAddressCity: req.body.permanentAddressCity,
        permanentAddressArea: req.body.permanentAddressArea,
        permanentAddressLane: req.body.permanentAddressLane,
        permanentAddressPinCode: req.body.permanentAddressPinCode,
        companyName: req.body.companyName,
        department: req.body.department,
        designation: req.body.designation,
        // dateOfJoin: req.body.dateOfJoin,
        dateOfJoin: req.body.dateOfJoin,
        adharNumber:req.body.adharNumber,
        PanNumber: req.body.PanNumber,
        accountNumber: req.body.accountNumber,
        accountName: req.body.accountName,
        bankName: req.body.bankName,
        ifsc: req.body.ifsc,

        adharImage:
          adharImage && adharImage[0]
            ? adharImage[0].filename
            : existingAdharImage,
        panImage:
          panImage && panImage[0] ? panImage[0].filename : existingPanImage,
        chequeImage:
          chequeImage && chequeImage[0]
            ? chequeImage[0].filename
            : existingChequeImage,
        drivingLicenseImage:
          drivingLicenseImage && drivingLicenseImage[0]
            ? drivingLicenseImage[0].filename
            : existingDrivingLicenseImage,
      },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Employee updated successfully..." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating employee..." });
  }
};

