const Sequelize = require("sequelize");
const sequelize = new Sequelize("gymdb", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
