const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const gymType = sequelize.define("gymType", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  name: {
    type: Sequelize.STRING,
    required: true,
    unique: true
  },
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  
 
});

module.exports = gymType;
