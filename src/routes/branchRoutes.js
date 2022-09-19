const express =  require("express");
const branchController =  require('../controller/branchController');

const router = express.Router();
router.post("/newBranch", branchController.createBranch);
router.get("/branches", branchController.getBranches);
router.get("/branch/:id", branchController.getBranchById);
router.put("/updatebranch/:id", branchController.updateBranch);
router.put("/cities", branchController.Getcities);
router.delete("/deletebranch/:id", branchController.deleteBranch);
router.get("/getBranches/:id", branchController.getBranchesByUserId);



module.exports = router;