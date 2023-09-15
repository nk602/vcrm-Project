const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require('path');
const protectRoute=require("../auth/checkAuth");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/'); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname ); // Use a unique filename
  }
});

const upload = multer({ storage: storage });

const masterController = require("../controllers//masterController");
Router.get("/masters-lists/",protectRoute, masterController.getMasters);
////getMastersTable
// Router.get("/list-masters-values/", masterController.getMastersTable);
Router.post("/add-masters/",upload.single("icon"), masterController.addMasters);
Router.get("/list-masters-values/",protectRoute, masterController.getMasterValues);
Router.get("/list-masters-values/:id",protectRoute,masterController.getUpdateMasterValuesById);
Router.post("/add-master-values/",protectRoute,upload.single("icon"), masterController.addMasterValues);
Router.get("/update-master/:id",protectRoute,masterController.get_update_masters);
Router.post("/update-master",protectRoute,upload.single("icon"),masterController.update_masters);
Router.post("/update-master-values",protectRoute,upload.single("icon"),masterController.update_masters_values);
Router.post("/delete-master/:id",protectRoute,masterController.delete_master);
Router.post("/delete-master-values/:id",masterController.delete_master_values);
Router.get("/masters-lists/",masterController.listValuesFromMasterTable);
Router.get("/edit-master-model-content/:id",masterController.editModelContents);//////get_update_masters_values
Router.get("/edit-master-values-model-content/:id",masterController.get_update_masters_values);
Router.post("/updateStatus/:id",masterController.updateStatusForMasterValues);
/////updateStatusForMasters
Router.post("/mastersUpdateStatus/:id",masterController.updateStatusForMasters);

////////krishna krishna hare /////////
////////hare hare
Router.post("/add-followup",masterController.addFollowUp);

module.exports = Router;