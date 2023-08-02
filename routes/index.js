const express = require("express");
// const router = express.Router;
const router = require("express").Router();
const app = express();
router.use("/admin", require("./admin/adminRoutes"));
router.use("/admin/dashboard", require("./dashboardRoutes"));
// router.use('/user/test',require('./user/test'))

module.exports = router;
