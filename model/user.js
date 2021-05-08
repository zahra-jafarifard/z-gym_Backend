const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const User = sequelize.define("User", {
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
  },
  lastName: {
    type: Sequelize.STRING,
    required: true,
  },
  password: {
    type: Sequelize.STRING,
    required: true,
  },
  mobile: {
    type: Sequelize.STRING,
    required: true,
    unique: true
  },
  gender: {
    type: Sequelize.STRING,
    required: true,
  },
  birthDay: {
    type: Sequelize.DATE,
    required: true,
  },
  height: {
    type: Sequelize.DOUBLE,
    required: true,
  },
  weight: {
    type: Sequelize.DOUBLE,
    required: true,
  },
  regDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  token: {
    type: Sequelize.STRING,
  },
  resetToken: {
    type: Sequelize.STRING,
  },
  resetTokenExpiration: {
    type: Sequelize.STRING,
  },
  rndNumber: {
    type: Sequelize.STRING,
  },
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  userStatusId :{
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  userGroupId :{
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = User;
