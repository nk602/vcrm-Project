const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");

module.exports.createEnquiryform = async (req, res) => {
  try {
    // Define validation schema for employee data
    const enquirySchema = Joi.object({
      firstName: Joi.string().min(4).max(100).required(),
      email: Joi.string().email().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
      totalWorkExperience: Joi.optional(),
      highestLevelOfEducation: Joi.optional(),
      jobTitle: Joi.optional(),
      companyName: Joi.optional(),
      utmCompaign: Joi.optional(),
      englishLanguage: Joi.optional(),
      city: Joi.optional(),
      utmTerm: Joi.optional(),
      utmMedium: Joi.optional(),
      utmSource: Joi.optional(),
    });
    // Validate the employee data using the schema
    const { error } = enquirySchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }
    const enquiry = await prisma.enquiryForm.create({
      data: req.body,
    });

    return res.status(200).json({
      status: "success",
      message: "Enquiry form created successfully...",
      data: enquiry,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ status: "error", message: error.message, data: {} });
  }
};
