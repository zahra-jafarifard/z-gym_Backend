const Sequelize = require('sequelize');

const sequelize = require('./sequelize');
const equipment = sequelize.define('equipment' , {
    id : {
        type :Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
        required:true
    },
    equipment_name : {
        type: Sequelize.STRING,
        required:true
    },
    flag:{
        type:Sequelize.BOOLEAN,
        allowNull:true
    }

})

module.exports=equipment;