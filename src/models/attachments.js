const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Attachment = db.define("attachment", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  file_type: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
});

module.exports = Attachment;
