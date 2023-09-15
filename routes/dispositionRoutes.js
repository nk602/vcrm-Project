const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
//////***** Disposition Controller *****/
const dispositionFormcontroller = require("../controllers/dispositionController");
const protectRoute = require("../auth/checkAuth");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/"); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname); // Use a unique filename
  },
});
const upload = multer({ storage: storage });
//*****disposition *****//
Router.post(
  "/add-disposition/",
  upload.single("icon"),
  dispositionFormcontroller.addDisposition
);
Router.get("/list-dispositions/", dispositionFormcontroller.getDispositions);
// Router.get("/edit-master-model-content/:id",masterController.editModelContents);
Router.get(
  "/edit-disposition-model-content/:id",
  dispositionFormcontroller.editDispositionModelContents
);
Router.post(
  "/update-disposition",
  upload.single("icon"),
  dispositionFormcontroller.update_disposition
);
// Router.post("/mastersUpdateStatus/:id",masterController.updateStatusForMasters);
Router.post(
  "/updateStatusForDisposition/:id",
  dispositionFormcontroller.updateStatusForDisposition
);
Router.post(
  "/delete-disposition/:id",
  dispositionFormcontroller.deleteDispositons
);
//////subDisposition
Router.get(
  "/list-subdispositionvalues/",
  dispositionFormcontroller.getSubDispositionValues
);
Router.post(
  "/add-subdisposition",
  upload.single("icon"),
  dispositionFormcontroller.addSubdisposition
);
Router.post(
  "/updateStatusForSubDisposition/:id",
  dispositionFormcontroller.updateStatusForSubdisposition
);
Router.get(
  "/edit-Subdispositon-model-content/:id",
  dispositionFormcontroller.editSubDispositionModelContents
);
Router.post(
  "/update-SubDisposition1",
  upload.single("icon"),
  dispositionFormcontroller.updateSubdisposition
);
Router.post(
  "/delete-subdisposition/:id",
  dispositionFormcontroller.deleteSubDispositons
);
module.exports = Router;
