const express =  require("express");
const roleController =  require('../controller/roleControllers');

const router = express.Router();
router.post("/role", roleController.createRole);
router.get("/roles", roleController.getAllRoles);



module.exports = router;