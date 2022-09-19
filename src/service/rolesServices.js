const roles = require("../models/roles");

const newRole = async (role) => {
  try {
    const createdRole = await roles.create(role);
    if (!createdRole)
      return { error: { message: "Not created, try again", code: 500 } };
    return { createdRole };
  } catch (error) {
    console.log(error);
    return { error: { message: error, code: 500 } };
  }
};

const getRoles = async () => {
  try {
    const role = await roles.findAll({ where: { active: true } });
    if (!role)
      return { error: { message: "No role find, try again", code: 500 } };
    return { role };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to find roles, try again",
        code: 500,
      },
    };
  }
};
const getRoleById = async (id) => {
  try {
    const role = await roles.findAll({ where: { id, active: true } });
    if (!role)
      return {
        error: {
          message: "no role found against this id, try again",
          code: 500,
        },
      };
    return { role };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to find role against id, try again",
        code: 500,
      },
    };
  }
};

const updateRole = async (user, id) => {
  try {
    const updatedrole = await roles.update(user, {
      where: { id, active: true },
    });
    if (!updatedrole)
      return { error: { message: "Not updated, try again", code: 500 } };
    console.log(updatedrole);
    return { updatedrole };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong in update role, try again",
        code: 500,
      },
    };
  }
};

const deleteRole = async (id) => {
  try {
    const updatedrole = await roles.update(
      { active: false },
      { where: { id } }
    );
    if (!updatedrole)
      return { error: { message: "Not deleted, try again", code: 500 } };
    console.log(updatedrole);
    return { updatedrole };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to delete comapny, try again",
        code: 500,
      },
    };
  }
};

module.exports = {
  newRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
