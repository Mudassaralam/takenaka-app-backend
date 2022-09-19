const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Client = db.define("client", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Client;
