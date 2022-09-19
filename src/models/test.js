const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Test = db.define("test", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

module.exports = Test;