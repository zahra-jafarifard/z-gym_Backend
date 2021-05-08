const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const workOutDetails = sequelize.define("workOutDetails", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  descriptipn: {
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
  workoutId:{
    type: Sequelize.INTEGER,
    references: {
      model: 'workouts',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false
  },
  daysOfWeekId:{
    type: Sequelize.INTEGER,
    references: {
      model: 'daysOfWeeks',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false
  },
  exerciseId:{
    type: Sequelize.INTEGER,
    references: {
      model: 'exercises',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false
  },
  
});

module.exports = workOutDetails;
