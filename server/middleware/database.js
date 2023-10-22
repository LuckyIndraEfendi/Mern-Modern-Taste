import dbConfig from "../config/dbConfig.js";
const sequelize = dbConfig;

const checkDatabaseConnection = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    next();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).send("Database connection error.");
  }
};

export default checkDatabaseConnection;