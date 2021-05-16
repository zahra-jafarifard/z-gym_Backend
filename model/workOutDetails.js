const Sequelize = require("sequelize");

const Exercise = require("./exercise");
const DaysOfWeek = require("./daysOfWeek");
const WorkOut = require("./workOut");


const sequelize = require("./sequelize");
const workOutDetails = sequelize.define("workOutDetails", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  description: {
    type: Sequelize.TEXT,
    required: true,
  },
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  reps: {
    type: Sequelize.INTEGER,
    required: true,
  },
  set: {
    type: Sequelize.INTEGER,
    required: true,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
  
});


// workOutDetails.associate = (models) => {
//   workOutDetails.belongsTo(models.Exercise, {
//     foreignKey: 'exersiceId'
//   });
//   workOutDetails.belongsTo(models.WorkOut, {
//     foreignKey: 'workOutId'
//   });
//   workOutDetails.belongsTo(models.DaysOfWeek, {
//     foreignKey: 'daysOfWeekId'
//   });
// };

module.exports = workOutDetails;
