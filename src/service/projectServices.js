const projects = require("../models/projects");

const newProject = async (project) => {
  try {
    const createdProject = await projects.create(project);
    if (!createdProject)
      return { error: { message: "Not created, try again", code: 500 } };
    return { createdProject };
  } catch (error) {
    console.log(error);
    return { error: { message: "Not created, network error", code: 503 } };
  }
};

const getProjects = async () => {
  try {
    const Project = await projects.findAll({ where: { active: true } });
    if (!Project)
      return { error: { message: "No Project find, try again", code: 500 } };
    return { Project };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to find permissions, try again",
        code: 500,
      },
    };
  }
};
const getProjectsById = async (id) => {
  try {
    const Project = await projects.findAll({ where: { id, active: true } });
    if (!Project)
      return {
        error: {
          message: "no project found against this id, try again",
          code: 500,
        },
      };
    return { Project };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to find project against id, try again",
        code: 500,
      },
    };
  }
};

const updatePermission = async (user, id) => {
  try {
    const updatedPermission = await permissions.update(user, {
      where: { id, active: true },
    });
    if (!updatedPermission)
      return { error: { message: "Not updated, try again", code: 500 } };
    console.log(updatedPermission);
    return { updatedPermission };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong in update permission, try again",
        code: 500,
      },
    };
  }
};

const deletePermission = async (id) => {
  try {
    const updatedPermission = await permissions.update(
      { active: false },
      { where: { id } }
    );
    if (!updatedPermission)
      return { error: { message: "Not deleted, try again", code: 500 } };
    console.log(updatedPermission);
    return { updatedPermission };
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
  newProject,
  getProjects,
  getProjectsById,
  updatePermission,
  deletePermission,
};
