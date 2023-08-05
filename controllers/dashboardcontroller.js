const express = require("express");
const multer = require("multer");
const path = require("path");
const Joi = require("joi");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueFileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});
module.exports.uploadImage = multer({ storage: storage }).fields([
  { name: "adharImage", maxCount: 1 },
  { name: "panImage", maxCount: 1 },
]);
module.exports.getAdmindashboard = async (req, res) => {
  res.render("admin-dashboard");
};
module.exports.ListEmployee = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    console.log(employees);
    res.render("list-employee", { employees });
  } catch (error) {
    console.log("Error While fetching employeess", error);
  }
};
module.exports.createEmplyee = async (req, res) => {
  // console.log(req.files['adharImage'][0].path);
  try {
    // const adharImagePath = req.files['adharImage'][0].path;
    // const panImagePath = req.files['panImage'][0].path;
    // const emailExists=await prisma.findUnique({email:email});
    // if(emailExists){
    //   console.log("emailExists",emailExists);
    //   return res.send({message:"Email already exists"});
    // }

    // Define validation schema for employee data
    const employeeSchema = Joi.object({
      firstName: Joi.string().min(4).max(100).required(),
      email: Joi.string().email().required(),
      lastName: Joi.string().required(),
      mobileNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
      dob: Joi.date().required(),
      gender: Joi.required(),
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
      adharNumber: Joi.optional(),
      panImage: Joi.optional(),
      PanNumber: Joi.optional(),
      drivingLicenseImage: Joi.optional(),
      chequeImage: Joi.optional(),
      accountNumber: Joi.optional(),
      accountName: Joi.optional(),
      bankName: Joi.optional(),
      ifsc: Joi.optional(),
    });

    // Validate the employee data using the schema
    const { error } = employeeSchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    await prisma.employee.create({
      data: req.body,
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

    res.redirect("/employees"); // Redirect back to the employee list
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee." });
  }
};

// Route to render the update-employee.ejs template
module.exports.get_update_employee = async (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  console.log("update");
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    // if (!employee) {
    //   return res.status(404).json({ error: "Employee not found." });
    // }

    res.render("add-employee1", { employee });
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee data." });
  }
};
module.exports.update_employee = async (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  console.log("updated");
  try {
    const employees = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    // if (!employee) {
    //   return res.status(404).json({ error: "Employee not found." });
    // }

    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      gender,
      currentAddressCountry,
      currentaddressState,
      currentAddressCity,
      currentAddressArea,
      currentAddressLane,
      currentAddressPinCode,
      sameAsCurrentAddress,
      permanentAddressCountry,
      permanentaddressState,
      permanentAddressCity,
      permanentAddressArea,
      permanentAddressLane,
      permanentAddressPinCode,
      companyName,
      department,
      designation,
      dateOfJoin,
      adharImage,
      adharNumber,
      panImage,
      PanNumber,
      drivingLicenseImage,
      chequeImage,
      accountNumber,
      accountName,
      bankName,
      ifsc,
    } = req.body;
    const employee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        firstName,
        lastName,
        email,
        mobileNumber,
        gender,
        // currentAddressCountry,
        // currentaddressState,
        // currentAddressCity,
        // currentAddressArea,
        // currentAddressLane,
        // currentAddressPinCode,
        // sameAsCurrentAddress,
        // permanentAddressCountry,
        // permanentaddressState,
        // permanentAddressCity,
        // permanentAddressArea,
        // permanentAddressLane,
        // permanentAddressPinCode,
        // companyName,
        // department,
        // designation,
        // dateOfJoin,
        // adharImage:adharImagePath,
        // panImage:panImagePath,
        // adharNumber,
        // PanNumber,
        // drivingLicenseImage,
        // chequeImage,
        // accountNumber,
        // accountName,
        // bankName,
        // ifsc
      },
    });
    console.log("updated2");

    res.render("list-employee", { employee }); // Redirect to the employee list page after successful update
  } catch (error) {
    // If an error occurs during the update process, redirect to an error page or display an error message
    res.status(500).send("Error updating employee.");
  }
};
