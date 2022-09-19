const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Role_permission = db.define("role_permission", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Role_permission;