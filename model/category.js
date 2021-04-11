const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  category_name: {
    type: Sequelize.STRING,
    required: true,
  },
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = category;
