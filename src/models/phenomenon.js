const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Phenomenon = db.define("phenomenon", {
  id: {
    type: Sequelize.INTEGER,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
});

module.exports = Phenomenon;