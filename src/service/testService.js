const Test = require("../models/test");
const { Sequelize } = require("sequelize");


const createTest = async (user) => {
  try {
    const createdUser = await Test.create(user);
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

module.exports={
    createTest
}