const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.ListCompaigns = async (req, res) => {
  res.render("list-compaigns");
};
module.exports.ListAgentCompaigns = async (req, res) => {
  const data = await prisma.campaigns.findMany();
  res.render("compaign-Listing", { data });
};
module.exports.Addcompaign = async (req, res) => {
  try {
    const createdAt = new Date(); // Replace this with your actual createdAt date

    // Get the year, month, and date components
    const year = createdAt.getFullYear().toString().slice(-2);
    const month = ("0" + (createdAt.getMonth() + 1)).slice(-2); // Adding 1 to month because it's 0-indexed
    const day = ("0" + createdAt.getDate()).slice(-2);

    // Format the date as "yy/mm/dd"
    const shortDate = `${year}/${month}/${day}`;
    console.log(shortDate);
    const compaignsHistory = await prisma.campaignHistory.create({
      data: {
        campaignName: req.body.campaignName,
        campaignTeam: req.body.campaignTeam,
        dispositionName: req.body.dispositionName,
        campaignStatus: req.body.campaignStatus,
        count: req.body.count,
        // createdAt:shortDate
      },
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed" });
  }
};
module.exports.AddCompaignName = async (req, res) => {
  // compaignsHistory
  console.log("compaignsHistory",req.body);
  try {
    const { campaignName, count } = req.body;
    const compaignsHistory = await prisma.campaigns.create({
      data: {
        campaignName: req.body.campaignName,
        count: 1,
      },
    });
    // res.status(200).json({
    //   message: "compaign name added successfully",
    //   data: compaignsHistory,
    // });
    res.redirect("/user/dashboard/")
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed" });
  }
};
module.exports.listActivityLogByCompaignId = async (req, res) => {
  try {
    const ActivityLog = await prisma.agentActivityLog.findMany({
      where: {
        campaign_id: 1,
      },
    });
    res
      .status(200)
      .json({
        message: "Activity logs fetched successfully",
        data: ActivityLog,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error While feching activity log" });
  }
};
