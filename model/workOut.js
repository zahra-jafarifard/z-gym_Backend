const Sequelize = require("sequelize");
const moment= require('moment')

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
  description: {
    type: Sequelize.TEXT,
    required: true,
  },
  startDate: {
    type: Sequelize.DATEONLY,
    required: true,
    get: function() {
      return moment.utc(this.getDataValue('startDate')).format('YYYY-MM-DD');
    },
  },

  endDate: {
    type: Sequelize.DATEONLY,
    required: true,
    get: function() {
      return moment.utc(this.getDataValue('endDate')).format('YYYY-MM-DD');
    }
  },
  
});

module.exports = workOut;
