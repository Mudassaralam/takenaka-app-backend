const projectServices = require("../service/projectServices");
const authService = require("../service/authServices");
const userService = require("../service/userServices");
const roleServices = require("../service/rolesServices");
const branchServices = require("../service/branchServices");
const { v4 } = require("uuid");
const uuid = v4;

const createProject = async (req, res) => {
  try {
    const { token } = req.headers;
    const {
      number,
      year,
      abbrev,
      country,
      name,
      client,
      structure,
      b,
      f,
      p,
      floorArea,
      contractType,
      from,
      handOver,
      location,
      buildingType,
      buildingType1,
      client_business,
      locality,
      prjectCode,
    } = req.body;
    
    const decoder = await authService.toknVerification(token);
    if (decoder.error)
      return res.status(decoder.error.code).send(decoder.error.message);
    const user = await userService.getUserById(decoder.decoder.id);
    if (!user.user) return res.status(400).send("No user found");
    const getRole = await roleServices.getRoleById(user.user.roleId);
    if (getRole.error)
      return res.status(getRole.error.code).send(getRole.error.message);
    if (getRole.role[0].name !== "admin")
      return res.status(400).send("You are not authorised");
      const branches = await branchServices.getBranchByCode(country);
      if (branches.error)
        return res.status(branches.error.code).send(branches.error.message);
        const data = {
          id: uuid(),
          number,
          year,
          abbrev,
          country,
          name,
          client,
          structure,
          b,
          f,
          p,
          floorArea,
          contractType,
          from,
          handOver,
          location,
          buildingType,
          buildingType1,
          client_business,
          locality,
          prjectCode,
          branchId: branches.Branch?.id,
          userId: user.user.id
        };
    const resp = await projectServices.newProject(data);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    res.status(200).send(resp.createdProject);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const allProjects = async (req, res) => {
  try {
    const { token } = req.headers;
    const decoder = await authService.toknVerification(token);
    if (decoder.error)
      return res.status(decoder.error.code).send(decoder.error.message);
    const user = await userService.getUserById(decoder.decoder.id);
    if (!user.user) return res.status(400).send("No user found");
    const getRole = await roleServices.getRoleById(user.user.roleId);
    if (getRole.error)
      return res.status(getRole.error.code).send(getRole.error.message);
    if (getRole.role[0].name !== "admin")
      return res.status(400).send("You are not authorised");
    const resp = await projectServices.getProjects();
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    resp.Project.sort((a, b) => {
        return a.number - b.number;
    });
    res.status(200).send(resp.Project);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const projectById = async (req, res) => {
  try {
    const { token } = req.headers;
    const { id } = req.body;
    const decoder = await authService.toknVerification(token);
    if (decoder.error)
      return res.status(decoder.error.code).send(decoder.error.message);
    const user = await userService.getUserById(decoder.decoder.id);
    if (!user.user) return res.status(400).send("No user found");
    const getRole = await roleServices.getRoleById(user.user.roleId);
    if (getRole.error)
      return res.status(getRole.error.code).send(getRole.error.message);
    if (getRole.role[0].name !== "admin")
      return res.status(400).send("You are not authorised");
    let Arr = [];
    for(i=0; i < id?.length; i++) {
      console.log("hello", id[i]);
      const resp = await projectServices.getProjectsById(id[i]);
      if (!resp) return res.status(400).send("No project found");
      if (resp.error)
        return res.status(resp.error.code).send(resp.error.message);
        let finalData = resp.Project[0];
      delete finalData.active;
    //   delete finalData.createdAt;
    //   delete finalData.updatedAt;
    //   delete finalData.userId;
    //   delete finalData.branchId;
    console.log("here",finalData);

      Arr.push(finalData)
    };
    res.status(200).send(Arr);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = {
  createProject,
  allProjects,
  projectById,
};
