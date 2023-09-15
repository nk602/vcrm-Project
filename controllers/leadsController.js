const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.createLeadsForm = async (req, res) => {
  console.log("ADD11111", req.body);
  try {
    // Validate the employee data using the schema
    // const { error } = enquirySchema.validate(req.body);

    // if (error) {
    //   throw new Error(error.details[0].message);
    // }
    const leads = await prisma.leads.create({
      data: req.body,
    });

    //  return res.status(200).json({
    //    status: "success",
    //   message: "Enquiry form created successfully...",
    //   // data: enquiry,
    //  });
    console.log(leads);
    res.redirect("/user/dashboard/users-leads");
    // res.redirect("/admin/dashboard/enquiry");
  } catch (error) {
    return res
      .status(404)
      .json({ status: "error", message: error.message, data: {} });
  }
};
module.exports.userLeadsDetails = async (req, res) => {
  try {
    res.render(
      "user-leads-details"
      //{ userLeads }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
