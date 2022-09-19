const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Issue = db.define("issue", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  occurance: {
    type: Sequelize.ENUM('before_ho', 'after_ho'),
    allowNull: true,
  },
  occurance_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  disturbance: {
    type: Sequelize.ENUM('yes', 'no'),
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM('ongoing', 'approved', 'completed'),
    allowNull: true,
  },
  level: {
    type: Sequelize.ENUM('i', 'ii', 'iii'),
    allowNull: true,
  },
  attachment: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  
});

module.exports = Issue;