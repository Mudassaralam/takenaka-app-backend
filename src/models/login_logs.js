const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Login_log = db.define("login_log", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  login_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expiry: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Login_log;