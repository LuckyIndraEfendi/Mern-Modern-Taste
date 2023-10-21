import {Sequelize}  from "sequelize";
import dotenv from "dotenv";
dotenv.config()

const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASS
const origin = process.env.DB_ORIGIN

const dbConnection = new Sequelize(database, username, password, {
  host: origin,
  dialect: "mysql" ,
})

export default dbConnection;