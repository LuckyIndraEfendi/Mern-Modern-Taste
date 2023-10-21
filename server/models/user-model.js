import dbConnection from "../config/dbConfig.js";
import { DataTypes, UUIDV4 } from "sequelize";

const User = dbConnection.define('user',{
  id : {
    type : DataTypes.STRING,
    primaryKey : true,
    defaultValue : UUIDV4
  },
  username : {
    type : DataTypes.STRING,
    allowNull : false,
    unique : true
  },
  age : {
    type : DataTypes.INTEGER,
    defaultValue : 18
  },
  email : {
    type : DataTypes.STRING,
    allowNull : false,
    unique : true
  },
  password : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      len : [8]
    }
  },
  role : {
    type : DataTypes.STRING,
    allowNull : false,
    defaultValue : 'user'
  },
},{
  timestamps : true,
  freezeTableName : true
})

User.sync({force: true}).then(() => {
  console.log("Table and Model Successfully Synced");
}).catch((err) => {
  console.log("Error when Syncing Model:", err);
});

export default User;