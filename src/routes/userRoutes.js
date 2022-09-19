const express = require("express");
const userControllers = require("../controller/userControllers");

const router = express.Router();
router.post("/newUser", userControllers.registerUser);
router.post("/login", userControllers.signInUser);
router.post("/otp", userControllers.otpVerify);
router.put("/forgetPassword", userControllers.forgetPass);
router.put("/updatePassword/:id", userControllers.updatePass);
router.post("/updateUser/:id", userControllers.updateUser);
router.get("/Users/:id", userControllers.allUsers);
router.delete("/inactiveUser", userControllers.deleteUser);
router.post("/activeUser", userControllers.ReactiveUser);
router.put("/updateBranches", userControllers.updateBranches);
router.get("/userById/:id", userControllers.getById);

module.exports = router;
