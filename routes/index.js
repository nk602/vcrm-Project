const express = require("express");
// const router = express.Router;
const router = require("express").Router();
const app = express();

router.use("/admin", require("./admin/adminRoutes"));
router.use("/admin/user/",require("./user/userRoutes"));
router.use("/admin/dashboard", require("./dashboardRoutes"));
router.use("/user", require("./dashboardRoutes"));
router.use("/admin/dashboard",require("./employeeForm/employeeRoutes"));
// router.use('/user/test',require('./user/test'))
router.use("/admin/dashboard", require("./mastersRoutes"));
router.use("/admin/dashboard", require("./enquiryRoutes"));
router.use("/admin/dashboard", require("./compaignsRoutes"));
router.use("/user/", require("./compaignsRoutes"));
router.use("/admin/dashboard", require("./vendorsRoutes"));
router.use("/admin/dashboard", require("./dispositionRoutes"));
router.use("/admin/dashboard",require("./csv/csvRoutes"));
router.use("/user/dashboard",require("./leadsRoutes"));
router.use("/crm/caller/Api/",require("./agentCrmRoutes"));
// router.use("/admin/dashboard",require("./mastersBackupRoutes"));
module.exports = router;
