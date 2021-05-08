const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const gym = sequelize.define("gym", {
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
  location: {
    type: Sequelize.GEOMETRY("POINT", 4326),
    // required: true,
  },
  address: {
    type: Sequelize.TEXT,
    required: true,
  },
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    required: true,
  },
  phoneNumber: {
    type: Sequelize.INTEGER,
    required: true,
  },
  gender: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = gym;
