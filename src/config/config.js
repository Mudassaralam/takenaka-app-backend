const { Sequelize } = require("sequelize");

  const dotenv = require("dotenv");
  dotenv.config();
  
  // const db = {};
  
  const sequelize = new Sequelize(
    "takenaka_server",
    "postgres",
    "1234",
    // process.env.DATABASE_URL,
    {
      dialect: "postgres",
      protocol: "postgres",
      logging: false,
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
  
  module.exports = sequelize;
  