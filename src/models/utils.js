const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Util = db.define("util", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  theme: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  sessio_expiry: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

module.exports = Util;