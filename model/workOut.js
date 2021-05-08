const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const workOut = sequelize.define("workOut", {
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
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  descriptipn: {
    type: Sequelize.TEXT,
    required: true,
  },
  startDate: {
    type: Sequelize.DATE,
    required: true,
  },
  endDate: {
    type: Sequelize.DATE,
    required: true,
  },
  createdById:{
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false
  },
  // userId:{
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: 'users',
  //     key: 'id',
  //   },
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   allowNull: false
  // },
  
});

module.exports = workOut;
