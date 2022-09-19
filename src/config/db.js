const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

// const db = {};

const sequelize = new Sequelize(
  "takenaka_server",
  "postgres",
  "12344321",
  // process.env.DATABASE_URL,
  {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
