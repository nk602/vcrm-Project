const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.ListEmployee = async (req, res) => {
  
  try {
     const employees = await prisma.employee.findMany();
     console.log(employees);
    res.render("list-employee",{ employees });
  } catch (error) {
    console.log("Error While fetching employeess", error);
  }
};
module.exports.createEmplyee = async (req, res) => {
  console.log("api testing....");
  console.log(req.body);
  try {
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
      dharImage,
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
    const newemployee = await prisma.employee.create({
      data: {
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
        dharImage,
        adharNumber,
        panImage,
        PanNumber,
        drivingLicenseImage,
        chequeImage,
        accountNumber,
        accountName,
        bankName,
        ifsc,
      },
    });
    console.log("New emlpyeee created", newemployee);
    res.redirect("/admin/dashboard/employees");
  } catch (error) {
    console.log("Error while creating new employee");
  }
};
module.exports.get_register_employee = async (req, res) => {
  res.render("add-emplyee");
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
  // const employeeId = parseInt(req.params.id, 10);
  console.log("update");
  try {
    // const employee = await prisma.employee.findUnique({
    //   where: {
    //     id: employeeId,
    //   },
    // });

    // if (!employee) {
    //   return res.status(404).json({ error: "Employee not found." });
    // }

    res.render("edit-employee");
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee data." });
  }
};
module.exports.update_employee = async (req, res) => {
  const employeeId = parseInt(req.params.id, 10);

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    const { name, email, gender, address, phoneNumber } = req.body;

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        name,
        email,
        gender,
        address,
        phoneNumber,
      },
    });

    res.redirect("/employees"); // Redirect to the employee list page after successful update
  } catch (error) {
    // If an error occurs during the update process, redirect to an error page or display an error message
    res.status(500).send("Error updating employee.");
  }
};
