const express =  require("express");
const projectController =  require('../controller/projectController');

const router = express.Router();
router.post("/project", projectController.createProject);
router.get("/projects", projectController.allProjects);
router.put("/projectsById", projectController.projectById);




module.exports = router;