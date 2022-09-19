const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Branch_logs = db.define("branch_logs", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
  });
  
  module.exports = Branch_logs;