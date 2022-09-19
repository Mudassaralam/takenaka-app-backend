const express = require("express");
const testControllers = require("../controller/testController");

const router = express.Router();
router.post("/newTest", testControllers.newTest);


module.exports = router;