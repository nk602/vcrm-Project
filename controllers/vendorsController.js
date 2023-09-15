const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports.ListOfVendors=async(req,res)=>{
 res.render("list-vendors")
}
