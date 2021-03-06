const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const exercise = sequelize.define("exercise", {
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
  description: {
    type: Sequelize.TEXT,
    required: true,
  },
  icon: {
    type: Sequelize.STRING,
    required: true,
  },
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = exercise;
