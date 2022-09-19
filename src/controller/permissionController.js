const permisiionServices = require("../service/permissionsServices");


const { v4 } = require("uuid");
const uuid = v4;

const createPermission = async (req, res) => {
    try {
      const {name} = req.body;

      const data = {
        name
      }
      const resp = await permisiionServices.newPermission(data);
      if (resp.error) return res.status(resp.error.code).send(resp.error.message);
      console.log(resp.createdPermission);
      res.status(200).send(resp.createdPermission);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong. Permission not created. Please try again");
    }
  };

  const allPermissions = async (req, res) => {
    try {
      const resp = await permisiionServices.getPermissions();
      if (resp.error) return res.status(resp.error.code).send(resp.error.message);
      console.log(resp.Permission);
      res.status(200).send(resp.Permission);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong. Permission not created. Please try again");
    }
  };

 

  module.exports = {
    createPermission,
    allPermissions,
  };