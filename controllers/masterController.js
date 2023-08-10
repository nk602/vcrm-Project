const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

module.exports.getMasters = async (req, res) => {
  const masters = await prisma.masters.findMany({});
  return res.render("list-masters", { masters,messages:'' });
};
module.exports.addMasters = async (req, res) => {
  console.log("add", req.body);
  const filePath = req.file ? path.join('uploads', req.file.filename) : "" ;
  const { name, icon, status } = req.body;

  try {
    const newMaster = await prisma.masters.create({
      data: {
        name,
        icon: filePath,
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
module.exports.get_update_masters = async (req, res) => {
  console.log("update", req.body); // Logging the request body
    const masters = await prisma.masters.findUnique({
      where: {
        id: 2,
      },
    });

    // Rendering a view named "modelbox/edit-master-model" with the fetched masters data
    res.render("modelbox/edit-master-model", { masters });
};
module.exports.update_masters = async (req, res) => {
  console.log("updateneww", req.body); // Logging the request body
  console.log("ddddd", req.file);
  const {masterid,master_name} = req.body;
  const filePath = req.file ? path.join('uploads', req.file.filename) : "" ;
  try {
  
    const updatedEmployee = await prisma.masters.update({
      where: {
        id: parseInt(masterid),
      },
      data: {
        name: master_name,
        icon: filePath,
      },
    });
    req.flash('success',"Record has been updated.")
    res.redirect("/admin/dashboard/masters-lists");
    
  } catch (error) {
    console.error(error);
    req.flash('error',"Error to update this record.")
    res.redirect("/admin/dashboard/masters-lists");
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