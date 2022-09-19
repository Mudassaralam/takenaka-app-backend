const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Position = db.define("position", {
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

module.exports = Position;