const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Permission = db.define("permission", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Permission;