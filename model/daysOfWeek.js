const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const daysOfWeek = sequelize.define("daysOfWeek", {
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

module.exports = daysOfWeek;
