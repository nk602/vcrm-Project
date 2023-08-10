const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require('path');
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
Router.get("/masters-lists/", masterController.getMasters);
////getMastersTable
// Router.get("/list-masters-values/", masterController.getMastersTable);
Router.post("/add-masters/",upload.single("icon"), masterController.addMasters);
Router.get("/list-masters-values/", masterController.getMasterValues);
Router.post("/add-master-values/",upload.single("icon"), masterController.addMasterValues);
Router.get("/update-master/:id",masterController.get_update_masters)
Router.post("/update-master/:id",masterController.update_masters)

Router.post("/delete-master/:id",masterController.delete_master);

Router.get("/masters-lists/",masterController.listValuesFromMasterTable);
Router.get("/edit-master-model-content/:id",masterController.editModelContents);




module.exports = Router;