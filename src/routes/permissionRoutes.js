const express =  require("express");
const permissionController =  require('../controller/permissionController');

const router = express.Router();
router.post("/permission", permissionController.createPermission);
router.get("/permissions", permissionController.allPermissions);




module.exports = router;