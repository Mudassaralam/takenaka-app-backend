const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Branch = db.define("branch", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Branch;