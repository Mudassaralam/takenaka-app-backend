const db = require("../config/db");
const { Sequelize } = require("sequelize");

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  takenaka_id:{
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  user_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
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
  qr_code: {
   type: Sequelize.STRING,
   allowNull: true
  },
  otp: {
    type: Sequelize.STRING,
    allowNull: true
   },
   otp_date: {
    type: Sequelize.DATE,
    allowNull: true
   },
  security_code: {
    type: Sequelize.STRING,
    allowNull: false
   }
});

module.exports = User;