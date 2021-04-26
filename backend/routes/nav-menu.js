const express = require("express");

const userController = require("../controllers/user");
const excelController = require("../controllers/credit-bureau-excel");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.get("/user/menu", checkAuth, userController.getUserMenu); 

// router.get("/user/excel", excelController.heatmap_download);3
router.post("/validate-excel-download", checkAuth, excelController.validate_download);
router.post("/validate-phone-excel-download", checkAuth, excelController.validate_phone_download);
router.get("/getCSO", checkAuth, excelController.get_CSO_data);
router.get("/getBranch", checkAuth, excelController.get_branch_data);
router.post("/create-PTS-excel", checkAuth, excelController.create_data_PTS);
router.post("/create-support-zip", checkAuth, excelController.create_support_zip);

module.exports = router;