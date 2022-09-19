const Users = require("../models/users");
const { Sequelize } = require("sequelize");
const createUser = async (user) => {
  try {
    const createdUser = await Users.create(user);
    if (!createdUser)
      return {
        error: { message: "Something went wrong, try again", code: 500 },
      };
    return { createdUser: createdUser };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};
const userByMail = async (email) => {
  try {
    const user = await Users.findOne({
      where: { email: { [Sequelize.Op.iLike]: email } },
    });
    return { user };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};
const userByUserName = async (user_name) => {
  try {
    const user = await Users.findOne({ where: { user_name } });
    return { user };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};
const userByUsertakenaka_id = async (takenaka_id) => {
  try {
    const user = await Users.findOne({ where: { takenaka_id } });
    return { user };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};
const getUserById = async (id) => {
  try {
    const newuser = await Users.findOne({ where: { id } });
    let user = newuser?.toJSON();
    return { user };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};
const loginUpdate = async (id) => {
  try {
    // let user = await Users.update({active: true},{where:{id:id}});
    let user = await Users.update({ active: true }, { where: { id } });
    return { user };
  } catch (error) {
    console.log(error);
    return { error: { message: error.message, code: 500 } };
  }
};
const destroyUser = async (id) => {
  try {
    let user = await Users.destroy({ where: { id } });
    return { Message: "User deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};
const updateUser = async (user, id) => {
  try {
    const updatedUser = await Users.update(user, { where: { id } });
    if (!updatedUser)
      return {
        error: { message: "Something went wrong, try again", code: 500 },
      };
    console.log(updatedUser);
    return { updatedUser: updatedUser };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};

const getUsers = async () => {
  try {
    let users = await Users.findAll();

    return { users };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await Users.update({ active: false }, { where: { id } });
    return { Message: "User deactivate successfully" };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};

const activeUser = async (id) => {
  try {
    let user = await Users.update({ active: true }, { where: { id } });
    return { Message: "User activate successfully" };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};

module.exports = {
  createUser,
  userByMail,
  loginUpdate,
  destroyUser,
  getUserById,
  updateUser,
  getUsers,
  deleteUser,
  userByUserName,
  activeUser,
  userByUsertakenaka_id,
};
