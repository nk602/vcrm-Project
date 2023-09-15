const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
//*****List Dispositions *****//
module.exports.getDispositions = async (req, res) => {
  const page = req.query.page || 1; // Get the requested page from the query parameter (default to 1)
  const pageSize = 5; // Set the number of items per page (you can adjust this as needed)
  const skip = (page - 1) * pageSize; // Calculate the number of items to skip
  const depositions = await prisma.disposition.findMany({
    skip: skip,
    take: pageSize,
  });
  // You can also calculate the total number of dispositions in the database for pagination
  const totalCount = await prisma.disposition.count();
  // Calculate the total number of pages based on the total count and page size
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log(page);
  return res.render("list-disposition", {
    depositions,
    currentPage: page,
    totalPages,
    messages: "",
  });
};

// module.exports.getDispositions = async (req, res) => {
//   const depositions = await prisma.disposition.findMany({
//     skip: 0,
//     take: 5,
//   });
//   return res.render("list-disposition", { depositions, messages: "" });
// };
module.exports.getSubDispositionValues = async (req, res) => {
  console.log("KKKKKK");
  const page = req.query.page || 1; // Get the requested page from the query parameter (default to 1)
  const pageSize = 5; // Set the number of items per page (you can adjust this as needed)
  const skip = (page - 1) * pageSize; // Calculate the number of items to skip

  const dispositions = await prisma.subdisposition.findMany({
    skip: skip,
    take: pageSize,
    include: {
      disposition: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    // skip: 3,
    // take: 4,
  });
  // console.log("KKKKKKK",dispositions.disposition.name);
  const dispositions1 = await prisma.disposition.findMany({
    where: {
      status: true,
    },
  });
  // You can also calculate the total number of dispositions in the database for pagination
  const totalCount = await prisma.subdisposition.count();

  // Calculate the total number of pages based on the total count and page size
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log("kkkkkk", dispositions1);
  return res.render("list-subdisposition", {
    dispositions,
    dispositions1,
    currentPage: page,
    totalPages,
    messages: "",
  });
};

module.exports.addDisposition = async (req, res) => {
  console.log("add", req.body);
  const filePath = req.file ? path.join("uploads", req.file.filename) : "";
  const { name, icon, status, disposition_name } = req.body;
  try {
    const newDisposition = await prisma.disposition.create({
      data: {
        name: disposition_name,
        icon: filePath,
        status: true,
      },
    });

    res.json({
      message: "Disposition created successfully...",
      disposition: newDisposition,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.addSubdisposition = async (req, res) => {
  console.log("add", req.body);
  const filePath = req.file ? path.join("uploads", req.file.filename) : "";
  const { name, icon, status, disposition_name, dispositionId } = req.body;

  try {
    const newDisposition = await prisma.subdisposition.create({
      data: {
        depositionId: parseInt(dispositionId),
        name: disposition_name,
        icon: filePath,
        status: true,
      },
    });

    res.json({
      message: "Subdisposition created successfully...",
      disposition: newDisposition,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.editDispositionModelContents = async (req, res) => {
  const masterId = parseInt(req.params.id);
  const dispositions = await prisma.disposition.findUnique({
    where: { id: masterId },
  });
  // console.log('kkk',masters.name);
  res.render("modelbox/edit-disposition-model", { dispositions });
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
module.exports.editSubDispositionModelContents = async (req, res) => {
  const masterId = parseInt(req.params.id);
  const subdispositions = await prisma.subdisposition.findUnique({
    where: { id: masterId },
    include: {
      disposition: true,
    },
  });
  const dispositions = await prisma.disposition.findMany({
    where: {
      status: true,
    },
  });
  // console.log('kkk',masters.name);
  res.render("modelbox/update-subdisposition-model", {
    subdispositions,
    dispositions,
  });
};

module.exports.update_disposition = async (req, res) => {
  console.log("updateneww", req.body); // Logging the request body
  console.log("ddddd", req.file);
  // disposition_name
  const { dispositionId, master_name, disposition_name, status } = req.body;
  const filePath = req.file ? path.join("uploads", req.file.filename) : "";
  try {
    let data = {};

    // Check if the file path exists and is not blank
    if (filePath && filePath !== "") {
      data.icon = filePath;
    }
    const updatedEmployee = await prisma.disposition.update({
      where: {
        id: parseInt(dispositionId),
      },
      data: {
        name: disposition_name,
        icon: data.icon,
        status,
      },
    });
    req.flash("success", "Record has been updated.");
    res.redirect("/admin/dashboard/list-dispositions");
  } catch (error) {
    console.error(error);
    req.flash("error", "Error to update this record.");
    res.redirect("/admin/dashboard/list-disposition");
  }
};
module.exports.updateStatusForDisposition = async (req, res) => {
  const dispositionId = parseInt(req.params.id);
  console.log("kkkkkkk", req.body);
  console.log("KKKKK");
  try {
    const newStatus = req.body.newStatus == 1 ? true : false;
    console.log(newStatus);
    await prisma.disposition.update({
      where: { id: dispositionId }, // Modify this based on your schema
      data: { status: newStatus },
    });

    res.json({ status: newStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
module.exports.deleteDispositons = async (req, res) => {
  try {
    const dispositionId = parseInt(req.params.id); // Assuming id is an integer

    // Delete the disposition using Prisma's delete method
    await prisma.disposition.delete({
      where: {
        id: dispositionId,
      },
    });

    // Redirect to a success page or some other relevant route
    res.redirect("/admin/dashboard/list-dispositions");
  } catch (error) {
    console.error("Error deleting disposition:", error);
    // Handle the error and redirect to an error page
    res.redirect("/error");
  }
};

module.exports.updateStatusForSubdisposition = async (req, res) => {
  const dispositionId = parseInt(req.params.id);
  console.log("kkkkkkk", req.body);
  console.log("KKKKK");
  try {
    const newStatus = req.body.newStatus == 1 ? true : false;
    console.log(newStatus);
    await prisma.subdisposition.update({
      where: { id: dispositionId }, // Modify this based on your schema
      data: { status: newStatus },
    });

    res.json({ status: newStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
// module.exports.editSubdispositionModelContents=async(req,res)=>{
//   const dispositionId=parseInt(req.params.id);
//   const depositions=await prisma.subdisposition.findUnique({
//     where:{
//       id:dispositionId
//     }
//   })
//   res.render("model/edit-subdisposition-model")
// }
module.exports.updateSubdisposition = async (req, res) => {
  console.log("updateLog", req.body);
  const { subdisposition_name, dispositionId, subDispositionId } = req.body;
  // const dispositionId=(req.params.id);
  const filePath = req.file ? path.join("uploads", req.file.filename) : "";
  try {
    let data = {}; ///
    if (filePath && filePath !== "") {
      data.icon = filePath;
    }
    ////update status
    const updatedRecords = await prisma.subdisposition.update({
      where: {
        id: parseInt(subDispositionId),
      },
      data: {
        name: subdisposition_name,
        depositionId: parseInt(dispositionId),
        icon: data.icon,
      },
    });
    req.flash("success", "Record has been updated.");
    res.redirect("/admin/dashboard/list-subDispositionValues");
  } catch (error) {
    console.error(error);
    req.flash("error", "Error updating this record.");
    // res.redirect("/admin/dashboard/masters-lists");
  }
};
module.exports.deleteSubDispositons = async (req, res) => {
  try {
    const subdispositionId = parseInt(req.params.id); // Assuming id is an integer

    // Delete the disposition using Prisma's delete method
    await prisma.subdisposition.delete({
      where: {
        id: subdispositionId,
      },
    });
  
    // Redirect to a success page or some other relevant route
    res.redirect("/admin/dashboard/list-subdispositionvalues");
  } catch (error) {
    console.error("Error deleting subdisposition:", error);
    // Handle the error and redirect to an error page
    res.redirect("/error");
  }
};
