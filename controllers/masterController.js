const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

module.exports.getMasters = async (req, res) => {
  const masters = await prisma.masters.findMany({});
  return res.render("list-masters", { masters });
};
module.exports.addMasters = async (req, res) => {
  console.log("add", req.body);
  console.log(req.file);
  // const adharImage = req.files["adharImage"];
  const { name, icon, status } = req.body;

  try {
    const newMaster = await prisma.masters.create({
      data: {
        name,
        icon: req.file?req.file.path:"",
        status: true,
      },
    });

    res.json({ message: "Master created successfully...", master: newMaster });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// module.exports.getMastersTable = async (req, res) => {
//   const masters = await prisma.masters.findMany();
//   res.render("list-masters-values", { masters });
// };
module.exports.getMasterValues = async (req, res) => {
  const mastersValues = await prisma.mastersValues.findMany();
  const masters = await prisma.masters.findMany();
  res.render("list-masters-values", { mastersValues, masters });
};

module.exports.addMasterValues = async (req, res) => {
  console.log("add", req.body);
  const { name, icon, masterId, status } = req.body;

  try {
    const newMaster = await prisma.mastersValues.create({
      data: {
        name: "Two Wheeler",
        icon: req.file ? req.file.path : "",
        masterId: 1,
        status: true,
      },
    });

    res.json({
      message: "Master values created successfully...",
      master: newMaster,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.listValuesFromMasterTable = async (req, res) => {
  try {
    const masters = await prisma.masters.findMany();
    const names = masters.map((master) => master.name);
    res.status(200).json({ success: true, names });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
module.exports.update_masters = async (req, res) => {
  console.log("update", req.body); // Logging the request body

  try {
    // Fetching the "masters" record with id 2
    const masters = await prisma.masters.findUnique({
      where: {
        id: 2,
      },
    });

    // Rendering a view named "modelbox/edit-master-model" with the fetched masters data
    res.render("modelbox/edit-master-model", { masters });

    // Updating the "masters" record with new data
    const updatedEmployee = await prisma.masters.update({
      where: {
        id: 2,
      },
      data: {
        name: "Vehicle Type 2",
        icon: "",
      },
    });

    // Sending a success response if the update was successful
    return res
      .status(200)
      .json({ status: "success", message: "Masters updated successfully..." });
  } catch (error) {
    console.error(error);

    // Sending an error response if any error occurs during the process
    res
      .status(500)
      .json({ status: "error", message: "Error updating employee..." });
  }
};

module.exports.delete_master = async (req, res) => {
  console.log(req.body);
  const masterId = parseInt(req.params.id);
  console.log("req.body", req.body);
  try {
    // Find the employee by id
    const employee = await prisma.masters.findUnique({
      where: { id: masterId },
    });

    if (!masterId) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // Delete the employee
    await prisma.employee.delete({
      where: { id: masterId },
    });

    res.redirect("/admin/dashboard/masters-lists"); // Redirect back to the employee list
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee.." });
  }
};
module.exports.editModelContents = async(req, res) =>{
  const masterId = parseInt(req.params.id);
  const masters = await prisma.masters.findUnique({
    where: { id: masterId },
  });
  // console.log('kkk',masters.name);
 res.render("modelbox/edit-master-model",{masters});
 /* try {
    // Find the employee by id
    const masterInfo = await prisma.masters.findUnique({
      where: { id: masterId },
    });
    console.log('kkk',masterInfo);
    return res.render("edit-master-model", { masterInfo });
    
  } catch (error) {
     //no pritning error
  }*/
}