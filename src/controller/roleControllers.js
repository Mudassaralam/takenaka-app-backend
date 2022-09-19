const userServices = require("../service/userServices");
const roleServices = require("../service/rolesServices");
const authService = require("../service/authServices");
const rolePermissionServices = require("../service/rolePermissionsServices");
const {
  getPermissions,
  getPermissionById,
  deletePermission
} = require("../service/permissionsServices");

const createRole = async (req, res) => {
  try {
    const { name, permissionId } = req.body;
    const data = {
      name,
      permissionId,
    };
    let Arr = [];
    const resp = await roleServices.newRole(data);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    for (i = 0; i < permissionId?.length; i++) {
      let data = {
        roleId: resp.createdRole.id,
        permissionId: permissionId[i],
      };
      const role_permissions = await rolePermissionServices.newRolePermission(
        data
      );
      if (role_permissions.error)
        return res
          .status(role_permissions.error.code)
          .send(role_permissions.error.message);
    }
    const resp1 = await rolePermissionServices.getRolePermissionsBYRoleId(
      resp.createdRole.id
    );
    if (resp1.error)
      return res.status(resp1.error.code).send(resp1.error.message);
    for (i = 0; i < resp1.rolePermissionsById.length; i++) {
      const permission = await getPermissionById(
        resp1.rolePermissionsById[i]?.permissionId
      );
      if (permission.error)
        return res.status(permission.error.code).send(permission.error.message);
      Arr.push(permission.Permission[0].name);
    }

    console.log(Arr);
    res.status(200).send({ role: resp.createdRole, permission: Arr });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const getAllRoles = async (req, res) => {
  try {
    const resp = await roleServices.getRoles();
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.role);
    res.status(200).send(resp.role);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const getAllPermissionsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await userServices.getUserById(id);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    const resp1 = await rolePermissionServices.getRolePermissionsBYRoleId(
      resp.user.roleId
    );
    if (resp1.error)
      return res.status(resp1.error.code).send(resp1.error.message);
    let Arr = [];
    for (i = 0; i < resp1.rolePermissionsById.length; i++) {
      const permission = await getPermissionById(
        resp1.rolePermissionsById[i]?.permissionId
      );
      if (permission.error)
        return res.status(permission.error.code).send(permission.error.message);
      Arr.push(permission.Permission[0].name);
    }
    console.log(Arr);
    res.status(200).send(Arr);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const getAllPermissionsByRoles = async (req, res) => {
  try {
    const resp = await roleServices.getRoles();
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    const rolesArray = [];
    for (i = 0; i < resp.role.length; i++) {
      const resp1 = await rolePermissionServices.getRolePermissionsBYRoleId(
        resp.role[i]?.id
      );
      let Arr = [];
      let roleName = resp.role[i].name;
      if (resp1.error)
        return res.status(resp1.error.code).send(resp1.error.message);
      if (resp1.rolePermissionsById.length > 0) {
        for (j = 0; j < resp1.rolePermissionsById.length; j++) {
          // console.log(resp1.rolePermissionsById[j]?.permissionId)
          const permission = await getPermissionById(
            resp1.rolePermissionsById[j]?.permissionId
          );
          if (permission.error)
            return res
              .status(permission.error.code)
              .send(permission.error.message);
          console.log(resp1.rolePermissionsById[j]?.permissionId, "id");
          console.log(permission.Permission[0]?.name);
          Arr.push(permission.Permission[0]?.name);
        }
      }
      rolesArray.push({ role: roleName, permissions: Arr, roleId: resp.role[i]?.id });
    }

    // console.log(rolesArray);
    res.status(200).send(rolesArray);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const updatePermissions = async (req, res) => {
  const { id } = req.params;
  const  {permissionsId, roleId}  = req.body;
  const { token } = req.headers;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    if (id !== resp.decoder.id || resp.decoder.role !== "admin")
      return res.status(403).send("unautorized user");
    const oldPermissions =
      await rolePermissionServices.getRolePermissionsBYRoleId(roleId);
    if (oldPermissions.error)
      return res
        .status(oldPermissions.error.code)
        .send(oldPermissions.error.message);

        console.log(oldPermissions, "yes");
        for (i = 0; i < oldPermissions.rolePermissionsById.length; i++) {
          const deletedPermissions = await rolePermissionServices.deleteRolePermissionById(
            oldPermissions.rolePermissionsById[i]?.id
          );
          if (deletedPermissions.error)
            return res.status(deletedPermissions.error.code).send(deletedPermissions.error.message);
        }
        for (i = 0; i < permissionsId?.length; i++) {
          let data = {
            roleId: roleId,
            permissionId: permissionsId[i],
          };
          const newPermissions = await rolePermissionServices.newRolePermission(
            data
          );
          if (newPermissions.error)
            return res.status(newPermissions.error.code).send(newPermissions.error.message);
        }
    res.status(200).send("Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong permissions not updated");
  }
};

module.exports = {
  getAllRoles,
  createRole,
  getAllPermissionsByUserId,
  getAllPermissionsByRoles,
  updatePermissions,
};
