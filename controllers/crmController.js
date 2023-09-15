const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
module.exports.agent_login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    console.error("Error during agent login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.agent_ready = async (req, res) => {
  try {
    const isValidAgent = req.body.status;
    if (isValidAgent === true) {
      res.status(200).json({
        success: true,
        message: "Agent is on ready state",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Not a Valid agent",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
/////app.post('/api/agentActivityLogs'
module.exports.AgentActivityLog = async (req, res) => {
  console.log("agentActivityLog", req.body);
  try {
    const { agent_id, campaign_id, activity_type, activity_time } = req.body;
    const agentActivityLog = await prisma.agentActivityLog.create({
      data: { agent_id:1, campaign_id, activity_type, activity_time },
    });
    res.redirect("/user/dashboard")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create agent activity log" });
  }
};
