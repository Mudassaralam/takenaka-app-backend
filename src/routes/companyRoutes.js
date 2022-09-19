const express =  require("express");
const companyController =  require('../controller/companyController');

const router = express.Router();
router.post("/newCompany", companyController.createCompany);
router.get("/companies", companyController.getCompanies);
router.get("/company/:id", companyController.getCompanyById);
router.put("/company/:id", companyController.updateCompany);
router.delete("/company/:id", companyController.deleteCompany);


module.exports = router;




