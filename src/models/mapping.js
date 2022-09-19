const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Mapping = db.define("mapping", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  expiry: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Mapping;