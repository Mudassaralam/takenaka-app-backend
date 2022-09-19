const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Device = db.define("device", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  type: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  mac_address: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  imei: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Device;
