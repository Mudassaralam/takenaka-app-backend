const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Project = db.define("project", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  number: {
    type: Sequelize.STRING(),
  },
  year: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  abbrev: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  client:{
    type: Sequelize.STRING(),
    allowNull: true
  },
  structure: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  b: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  f: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  p: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  floorArea: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  contractType: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  from: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  handOver: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  location: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  buildingType: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  buildingType1: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  client_business: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  client_business: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  locality: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  prjectCode: {
    type: Sequelize.STRING(),
    allowNull: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Project;