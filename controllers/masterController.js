const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const Joi = require("joi");

module.exports.getMasters = async (req, res) => {
  const page = req.query.page || 1; // Get the requested page from the query parameter (default to 1)
  const pageSize = 5; // Set the number of items per page (you can adjust this as needed)
  const skip = (page - 1) * pageSize; 
  const masters = await prisma.masters.findMany({
    skip: skip,
    take: pageSize,
  });
  const totalCount = await prisma.masters.count();
  // Calculate the total number of pages based on the total count and page size
  const totalPages = Math.ceil(totalCount / pageSize);
  return res.render("list-masters", { masters,
    currentPage: page,
    totalPages, messages: "" });
};
module.exports.addMasters = async (req, res) => {
  console.log("add", req.body);
  const filePath = req.file ? path.join("uploads", req.file.filename) : "";
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

module.exports.getMasterValues = async (req, res) => {
  const mastersValues = await prisma.mastersValues.findMany({
    include: {
      master: true, // All posts where authorId == 20
    },
  });
  console.log(mastersValues);
  const masters = await prisma.masters.findMany({
    where: {
      status: true,
    },
  });
  res.render("list-masters-values", { mastersValues, masters });
};

module.exports.addMasterValues = async (req, res) => {
  const filePath = req.file ? path.join("uploads", req.file.filename) : "";
  console.log("add", req.body);

  const { master_name, mastervaluesName, icon, masterId, status } = req.body;

  try {
    const newMaster = await prisma.mastersValues.create({
      data: {
        name: mastervaluesName,
        icon: filePath,
        masterId: parseInt(master_name),
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
module.exports.getUpdateMasterValuesById = async (req, res) => {
  try {
    const masterId = req.params.masterId; // Assuming the masterId is part of the route URL

    // Fetch master values from the database using Prisma based on masterId
    const mastersValues = await prisma.masterValue.findUnique({
      where: { id: masterId },
    });

    // Render the update master values page with the fetched data
    res.render("list-masters-values", { mastersValues });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("Internal Server Error");
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

module.exports.get_update_masters_values = async (req, res) => {
  console.log("update", req.body); // Logging the request body
  const masterValId = req.params.id;
  const mastersValues = await prisma.mastersValues.findUnique({
    where: {
      id: parseInt(masterValId),
    },
  });
  const masters = await prisma.masters.findMany({
    where: {
      status: true,
    },
  });
  // Rendering a view named "modelbox/edit-master-model" with the fetched masters data
  res.render("modelbox/edit-master-values-model.ejs", {
    mastersValues,
    masters,
  });
};
module.exports.update_masters = async (req, res) => {
  console.log("updateneww", req.body); // Logging the request body
  console.log("ddddd", req.file);
  const { masterid, master_name, status } = req.body;
  const filePath = req.file ? path.join("uploads", req.file.filename) : "";
  try {
    let data = {};

    // Check if the file path exists and is not blank
    if (filePath && filePath !== "") {
      data.icon = filePath;
    }
    const updatedEmployee = await prisma.masters.update({
      where: {
        id: parseInt(masterid),
      },
      data: {
        name: master_name,
        icon: data.icon,
        status,
      },
    });
    req.flash("success", "Record has been updated.");
    res.redirect("/admin/dashboard/masters-lists");
  } catch (error) {
    console.error(error);
    req.flash("error", "Error to update this record.");
    res.redirect("/admin/dashboard/masters-lists");
  }
};
module.exports.update_masters_values = async (req, res) => {
  console.log("update_masters_values", req.body);
  console.log("ddddd", req.file);

  const { masterid, master_name, master_values_id } = req.body;
  const filePath = req.file ? path.join("uploads", req.file.filename) : "";

  try {
    let data = {}; // Initialize the data object

    // Check if the file path exists and is not blank
    if (filePath && filePath !== "") {
      data.icon = filePath;
    }

    // Update the mastersValues record
    const updatedEmployee = await prisma.mastersValues.update({
      where: {
        id: parseInt(masterid),
      },
      data: {
        masterId: parseInt(master_values_id),
        name: master_name,
        icon: data.icon,
      },
    });
    req.flash("success", "Record has been updated.");
    res.redirect("/admin/dashboard/list-masters-values");
  } catch (error) {
    console.error(error);
    req.flash("error", "Error updating this record.");
    res.redirect("/admin/dashboard/masters-lists");
  }
};

// module.exports.update_masters_values = async (req, res) => {
//   console.log("updateneww1", req.body);
//   console.log("ddddd", req.file);

//   const { masterid, master_name } = req.body;
//   const filePath = req.file?path.join('uploads',req.file.filename) : "";

//   try {
//     let data = {}; // Initialize the data object

//     // Check if the file path exists and is not blank
//     if (filePath && filePath !== "") {
//       data.icon = filePath;
//     }

//     const existingMastersValues = await prisma.mastersValues.findUnique({
//       where: {
//         id: parseInt(masterid),
//       },
//     });

//     // Check if the existing icon is not blank
//     if (!existingMastersValues.icon) {
//       // Update the record only if existing icon is blank
//       const updatedEmployee = await prisma.mastersValues.update({
//         where: {
//           id: parseInt(masterid),
//         },
//         data: {
//           name: master_name,
//           icon: data.icon,
//         },
//       });

//       req.flash('success', "Record has been updated.");
//     } else {
//       req.flash('info', "Existing icon is not blank, so not updated.");
//     }

//     res.redirect("/admin/dashboard/list-masters-values");
//   } catch (error) {
//     console.error(error);
//     req.flash('error', "Error updating this record.");
//     res.redirect("/admin/dashboard/masters-lists");
//   }
// };

// module.exports.update_masters_values = async (req, res) => {
//   console.log("updateneww1", req.body); // Logging the request body
//   console.log("ddddd",req.file);
//   const {masterid,master_name,icon} = req.body;
//   const filePath = req.file?path.join('uploads', req.file.filename):"" ;
//   let data = {}; // Initialize the data object

// //  data.name = master_name

// // if(filePath!= ""){
// //   data.icon = filePath
// // }
// // else{
// //   data.icon ="";
// // }
//   try {
//    const updatedEmployee = await prisma.mastersValues.update({
//       where: {
//         id: parseInt(masterid),
//       },
//       data: {
//         name: master_name,
//         icon:filePath,
//       },
//     });
//     req.flash('success',"Record has been updated.")
//     res.redirect("/admin/dashboard/list-masters-values");

//   } catch (error) {
//     console.error(error);
//     req.flash('error',"Error to update this record.")
//     // res.redirect("/admin/dashboard/masters-lists");
//   }
// };
module.exports.delete_master = async (req, res) => {
  console.log("delete_master", req.body);
  const masterId = parseInt(req.params.id);
  try {
    // Find the employee by id
    const masters = await prisma.masters.findUnique({
      where: { id: masterId },
    });

    if (!masterId) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // Delete the employee
    await prisma.masters.delete({
      where: { id: masterId },
    });

    res.redirect("/admin/dashboard/masters-lists"); // Redirect back to the employee list
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee.." });
  }
};

module.exports.delete_master_values = async (req, res) => {
  console.log(req.body);
  const masterId = parseInt(req.params.id);
  console.log("req.body", req.body);
  try {
    // Find the employee by id
    const employee = await prisma.mastersValues.findUnique({
      where: { id: masterId },
    });

    if (!masterId) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // Delete the employee
    await prisma.mastersValues.delete({
      where: { id: masterId },
    });

    res.redirect("/admin/dashboard/list-masters-values"); // Redirect back to the employee list
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee.." });
  }
};
module.exports.editModelContents = async (req, res) => {
  const masterId = parseInt(req.params.id);
  const masters = await prisma.masters.findUnique({
    where: { id: masterId },
  });
  // console.log('kkk',masters.name);
  res.render("modelbox/edit-master-model", { masters });
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
};

module.exports.updateStatusForMasters = async (req, res) => {
  const masterId = parseInt(req.params.id);
  console.log("kkkk1111", req.body);
  try {
    const newStatus = req.body.newStatus == 1 ? true : false;
    console.log(newStatus);
    await prisma.masters.update({
      where: { id: masterId }, // Modify this based on your schema
      data: { status: newStatus },
    });
    res.json({ status: newStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports.updateStatusForMasterValues = async (req, res) => {
  const masterId = parseInt(req.params.id);
  console.log("kkkk", req.body);

  try {
    const newStatus = req.body.newStatus == 1 ? true : false;
    console.log(newStatus);
    await prisma.mastersValues.update({
      where: { id: masterId }, // Modify this based on your schema
      data: { status: newStatus },
    });

    res.json({ status: newStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
module.exports.addFollowUp = async (req, res) => {
  console.log("addFollowUp", req.body);
  const { clientId, source } = req.body;

  try {
    // Attempt to create a new employee record
    const data = await prisma.employee.create({
      data: {
        firstName: source,
      },
    });
    res.status(200).json({ message: "followup created successfully" });
    // If the record is created successfully, you can redirect
    // res.redirect("/user/dashboard/converted");
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error("Error creating employee:", error);

    // Optionally, you can send an error response to the client
    res
      .status(500)
      .json({ error: "An error occurred while creating the employee record." });
  }
};
