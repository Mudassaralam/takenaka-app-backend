const userService = require("../service/userServices");
const authService = require("../service/authServices");
const mailService = require("../service/mailServices");
const branchServices = require("../service/branchServices");
const branch_logServices = require("../service/branch_logServices");
const roleServices = require("../service/rolesServices");
let Country = require("country-state-city").Country;
const deviceServices = require("../service/deviceServices");
const Validation = require("../validations/validations");
const fs = require("fs");

const { v4 } = require("uuid");
const uuid = v4;
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  const {
    name,
    takenaka_id,
    user_name,
    email,
    password,
    phone,
    branchId,
    roleId,
  } = req.body;
  try {
    let email1 = email.toLowerCase();
    const validation = await Validation.createUserSchema.validate(req.body);
    if (validation.error) return res.status(403).json(validation.error.message);
    const resp = await userService.userByMail(email1);
    if (resp.user)
      return res.status(400).send("User already exist against this email");
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    const resp1 = await userService.userByUserName(user_name);
    if (resp1.user)
      return res.status(400).send("User already exist against this usename");
    if (resp1.error)
      return res.status(resp1.error.code).send(resp.error.message);
    const id_check = await userService.userByUsertakenaka_id(takenaka_id);
    if (id_check.user)
      return res.status(400).send("User already exist against this Takenaka Id");
    if (id_check.error)
      return res.status(id_check.error.code).send(id_check.error.message);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    code = "tak" + takenaka_id;
    let name1 = name.toLowerCase();

    //Email change

    const newUser = {
      name: name1,
      takenaka_id: code,
      user_name,
      email: email1,
      password: hashedPassword,
      phone,
      security_code: "0000",
      roleId,
    };
    const createdUser = await userService.createUser(newUser);
    if (createdUser.error)
      return res.status(createdUser.error.code).send(createdUser.error.message);
    let createDevice = {
      userId: createdUser.createdUser.id,
    };
    const device = await deviceServices.newDevice(createDevice);
    if (device.error)
      return res.status(device.error.code).send(device.error.message);
    for (i = 0; i < branchId.length; i++) {
      let branchesData = {
        userId: createdUser.createdUser.id,
        branchId: branchId[i],
      };
      console.log(branchesData);
      const resp7 = await branch_logServices.newBranch_logs(branchesData);
      if (resp7.error)
        return res.status(resp7.error.code).send(resp7.error.message);
      console.log(resp7);
    }
    const resp8 = await branch_logServices.getBranch_logsByUser_id(
      createdUser.createdUser.id
    );
    if (resp8.error)
      return res.status(resp8.error.code).send(resp8.error.message);
    console.log(resp8.Branch_log);
    let Arr = [];
    for (i = 0; i < resp8.Branch_log.length; i++) {
      const branches = await branchServices.getBranchById(
        resp8.Branch_log[i].branchId
      );
      if (branches.error)
        return res.status(branches.error.code).send(branches.error.message);
        const branchName = {
          name:branches.Branch[0].name,
          code:branches.Branch[0].code
        }
      Arr.push(branchName);
    }

    const resp3 = await mailService.sendingmail(
      email,
      `Following are your login credential
       Email: ${email},
       password:${password},
       Username:${user_name},
       Phone: ${phone}`
    );
    console.log(resp3)
    if (resp3?.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    console.log(createdUser.createdUser);
    delete createdUser.createdUser.password;
    let newCreatedUser = createdUser.createdUser;
    res.status(200).send({ newCreatedUser, branches: Arr });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong, try again" });
  }
};

const signInUser = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  try {
    const email1 = email?.toLowerCase();
    const resp = await userService.userByMail(email1);
    if (!resp.user) return res.status(400).send("User not found");
    if (!resp.user.active) return res.status(400).send("User not authorised");
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    const resp2 = await authService.passwordVerification(
      password,
      resp.user.password
    );
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    let code = Math.floor(Math.random() * (999 - 100 + 1)) + 999;
    const resp3 = await authService.loginToken(resp.user.email, code);
    if (resp3.error)
      return res.status(resp3.error.code).send(resp3.error.message);

    otp = resp.user.otp;
    user_email = resp.user.email;
    console.log(code);
    let user = {
      user_email,
      otp: code,
      otp_date: new Date(),
    };
    const Sentemail = await mailService.sendingmail(
      email,
      `Following is your onetime OTP
       ${code}
       
       NOTE: This is valid only in 5 minutes`
    );
    if (Sentemail?.error)
      return res.status(Sentemail.error.code).send(Sentemail.error.message);
    const updatedUser = await userService.updateUser(user, resp.user.id);
    if (updatedUser.error)
      return res.status(updatedUser.error.code).send(updatedUser.error.message);
    const resp4 = await userService.getUserById(resp.user.id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    console.log(resp4.user.password);
    delete resp4.user.password;
    delete resp4.user.otp;
    return res
      .status(200)
      .send({ data: { signInUser: resp4.user, message: "Success" } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const otpVerify = async (req, res) => {
  const { otp, email } = req.body;
  try {
    console.log("here");
    const user = await userService.userByMail(email);
    if (!user.user) return res.status(400).send("User not found");
    if (user.error) return res.status(user.error.code).send(user.error.message);
    let date = user.user.otp_date;
    let date2 = new Date(date.getTime() + 5 * 60000);
    let currentDate = new Date();
    if (currentDate > date2) return res.status(403).send("Otp expired");
    if (user.user.otp != otp) return res.status(403).send("Otp not matched");
    let id = user.user.id;
    const resp2 = await userService.getUserById(id);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    let otp2 = user.user.otp;
    const newUser = {
      otp: null,
    };
    const resp4 = await userService.updateUser(newUser, id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    const updatedUser = await userService.getUserById(id);
    if (updatedUser.error)
      return res.status(updatedUser.error.code).send(updatedUser.error.message);
    const getRole = await roleServices.getRoleById(user.user.roleId);
    if (getRole.error)
      return res.status(getRole.error.code).send(getRole.error.message);
    let role = getRole.role[0]?.name;
    const resp5 = await authService.tokengenerator(
      user.user.id,
      user.user.email,
      role
    );
    const resp8 = await branch_logServices.getBranch_logsByUser_id(
      user.user.id
    );
    if (resp8.error)
      return res.status(resp8.error.code).send(resp8.error.message);
    console.log(resp8.Branch_log);
    let Arr = [];
    for (i = 0; i < resp8.Branch_log.length; i++) {
      const branches = await branchServices.getBranchById(
        resp8.Branch_log[i].branchId
      );
      if (branches.error)
        return res.status(branches.error.code).send(branches.error.message);
      Arr.push(branches.Branch[0].name);
    }
    if (resp5.error)
      return res.status(resp5.error.code).send(resp5.error.message);
    return res.status(200).json({
      user: updatedUser.user,
      token: resp5.token,
      role: getRole.role[0].name,
      branches: Arr,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  const { phone, city, address, country } = req.body;
  const { token } = req.headers;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    if (id !== resp.decoder.id) return res.status(403).send("unautorized user");

    const resp2 = await userService.getUserById(id);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);

    //Email change
    let country1;
    let state = Country.getAllCountries();
    for (let i = 0; i < state.length; i++) {
      if (state[i].isoCode === country) {
        country1 = state[i].name;
      }
    }
    const newUser = {
      city: city,
      phone: phone,
      address: address,
      country: country1,
    };
    const resp4 = await userService.updateUser(newUser, id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    if (resp4.updatedUser.length < 1)
      res.status(500).send({ message: "Could not update user" });
    const resp5 = await userService.getUserById(id);
    if (!resp5) return res.status(resp5.error.code).send(resp5.error.message);
    delete resp5.user.otp;
    delete resp5.user.password;
    const getRole = await roleServices.getRoleById(resp5.user.roleId);
    if (getRole.error)
      return res.status(getRole.error.code).send(getRole.error.message);
    const tokenGen = await authService.tokengenerator(
      resp5.user.id,
      resp5.user.email,
      resp5.user.role
    );
    if (tokenGen.error)
      return res.status(tokenGen.error.code).send(tokenGen.error.message);
    return res.status(200).json({
      user: resp5.user,
      token: tokenGen.token,
      role: getRole.role[0].name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const updatePass = async (req, res) => {
  let { id } = req.params;
  const { password, newPassword, confirmPassword } = req.body;
  const { token } = req.headers;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (id !== resp.decoder.id) return res.status(403).send("unautorized user");
    let resp2 = await userService.getUserById(id);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    console.log("Ahmad");
    const validation = await Validation.updatePasswordSchema.validate(req.body);
    if (validation.error) return res.status(403).json(validation.error.message);
    const resp3 = await authService.passwordVerification(
      password,
      resp2.user.password
    );

    if (resp3.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    if (newPassword !== confirmPassword)
      return res.status(403).send("confirm password is not matching");
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    resp2.user.password = hashedPassword;
    let newPass = { password: resp2.user.password };
    const resp4 = await userService.updateUser(newPass, id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.status(200).send({ updatedUser: "password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const forgetPass = async (req, res) => {
  const { email } = req.body;
  try {
    const resp = await userService.userByMail(email);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (!resp.user) return res.status(400).send("Incorrect email");
    let randomCode = Math.floor(10000000 + Math.random() * 90000000);
    let code = "Tak" + "@" + randomCode;
    console.log(randomCode);
    console.log(code);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(code.toString(), salt);
    resp.user.userPassword = hashedPassword;
    let newPass = { password: resp.user.userPassword };
    console.log(hashedPassword);
    const resp4 = await userService.updateUser(newPass, resp.user.id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    const resp3 = await mailService.sendingmail(
      email,
      `Following is your new Password
    ${code}`
    );
    if (resp3?.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    return res.status(200).send("check your email for new Password");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const allUsers = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user.user) return res.status(400).send("No user found");
    const getRole = await roleServices.getRoleById(user.user.roleId);
    if (getRole.error)
      return res.status(getRole.error.code).send(getRole.error.message);
    if (getRole.role[0].name !== "admin")
      return res.status(400).send("You are not authorised");
    const resp = await userService.getUsers();
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (!resp.users) return res.status(400).send("No user found");
    let newUsers = resp.users;
    console.log("length", newUsers.length);
    async function method1() {
      var userArray = [];
      for (i = 0; i < newUsers.length; i++) {
        let getRole1;
        getRole1 = await roleServices.getRoleById(newUsers[i]?.roleId);
        if (getRole1.error)
          return res.status(getRole1.error.code).send(getRole1.error.message);
        let value = "";
        if (newUsers[i]?.active === true) {
          value = "yes";
        } else value = "no";
        let resp8;
        resp8 = await branch_logServices.getBranch_logsByUser_id(
          newUsers[i]?.id
        );
        if (resp8.error)
          return res.status(resp8.error.code).send(resp8.error.message);
        let Arr = [];
        for (j = 0; j < resp8.Branch_log.length; j++) {
          let branches = await branchServices.getBranchById(
            resp8.Branch_log[j].branchId
          );
          if (branches.error)
            return res.status(branches.error.code).send(branches.error.message);
          Arr.push(branches.Branch[0].code, ",");
        }
        Arr.pop();
        userArray.push({
          userId: newUsers[i]?.id,
          takenaka_id: newUsers[i]?.takenaka_id,
          name: newUsers[i]?.name,
          country: newUsers[i]?.country,
          email: newUsers[i]?.email,
          user_name: newUsers[i]?.user_name,
          role: getRole1.role[0]?.name,
          branch: Arr,
          active: value,
        });
      }
      return res.status(200).send(userArray);
    }
    method1();
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const getById = async (req, res) => {
  let id = req.params.id;
  try {
    const resp = await userService.getUserById(id);
    if (!resp.user) return res.status(400).send("No user found");

    delete resp.user.userPassword;
    return res.status(200).send(resp.user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const deleteUser = async (req, res) => {
  let { id } = req.body;
  const { token } = req.headers;
  try {
    console.log(req.body);
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    if (resp.decoder.role !== "admin")
      return res.status(403).send("unautorized user");
    const resp2 = await userService.getUserById(id);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    const resp4 = await userService.deleteUser(id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.status(200).send(resp4.Message);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const ReactiveUser = async (req, res) => {
  let { id } = req.body;
  const { token } = req.headers;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    if (resp.decoder.role !== "admin")
      return res.status(403).send("unautorized user");

    const resp2 = await userService.getUserById(id);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    const resp4 = await userService.activeUser(id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.status(200).send(resp4.Message);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const updateBranches = async (req, res) => {
  let { userId, branches } = req.body;
  const { token } = req.headers;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    if (resp.decoder.role !== "admin")
      return res.status(403).send("unautorized user");
    const user = await userService.getUserById(userId);
    console.log(user.user);
    if (!user) return res.status(user.error.code).send(user.error.message);
    if(!user.user.active) return res.status(404).send("Active the user first");
    const delPreBranches = await branch_logServices.deleteBranch_logs(userId);
    if (!delPreBranches)
      return res
        .status(delPreBranches.error.code)
        .send(delPreBranches.error.message);
    for (i = 0; i < branches.length; i++) {
      let branchesData = {
        userId,
        branchId: branches[i],
      };
      console.log(branchesData);
      const resp7 = await branch_logServices.newBranch_logs(branchesData);
      if (resp7.error)
        return res.status(resp7.error.code).send(resp7.error.message);
      console.log(resp7);
    }
    const allBranches = await branch_logServices.getBranch_logsByUser_id(
      userId
    );
    if (!allBranches)
      return res.status(allBranches.error.code).send(allBranches.error.message);
    console.log(allBranches);
    return res.status(200).send(allBranches);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const updateProfilePicture = async (req, res) => {
  const { token } = req.headers;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (!resp.decoder.id) return res.status(403).send("unautorized user");
    const resp2 = await userService.getUserById(resp.decoder.id);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    if (!req.files)
      return res.status(500).send({ message: "Please select a file." });
    const profilePic = req.files.img;
    const splitArray = req.files.img.name.split(".");
    const extension = req.files.img.name.split(".")[splitArray.length - 1];
    profilePic.name = `profile-${uuid()}.${extension}`;
    let pictureSaved = true;
    const path = __dirname + "/uploads/" + profilePic.name;
    profilePic.mv(path, (err) => {
      if (err) {
        console.log(+err);
        pictureSaved = false;
      }
    });

    if (!pictureSaved) {
      return res
        .status(500)
        .send({ message: "Couldn't update profile picture. 1" });
    }
    let oldDeleted = true;
    if (resp2.user.profilePic) {
      fs.unlink(__dirname + "/uploads/" + resp2.user.profilePic, (err) => {
        if (err) {
          console.log(err);
          oldDeleted = false;
        }
      });
    }
    if (!oldDeleted) {
      return res
        .status(500)
        .send({ message: "Couldn't update profile picture. 2" });
    }

    const userPic = { profilePic: profilePic.name };

    const resp4 = await userService.updateUser(userPic, resp.decoder.id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.status(200).send({ updatedUser: resp4.updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = {
  registerUser,
  signInUser,
  updateUser,
  updatePass,
  forgetPass,
  allUsers,
  getById,
  deleteUser,
  updateProfilePicture,
  otpVerify,
  ReactiveUser,
  updateBranches,
};
