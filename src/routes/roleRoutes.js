const express =  require("express");
const roleController =  require('../controller/roleControllers');

const router = express.Router();
router.post("/role", roleController.createRole);
router.get("/roles", roleController.getAllRoles);
router.get("/permissions/:id", roleController.getAllPermissionsByUserId);
router.get("/rolePermissions", roleController.getAllPermissionsByRoles);
router.put("/updateRolePermissions/:id", roleController.updatePermissions);


module.exports = router;