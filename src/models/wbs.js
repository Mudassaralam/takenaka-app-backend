const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Wbs = db.define("wbs", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  wbs_code: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Wbs;