const Sequelize = require('sequelize');

const sequelize = require('./sequelize');
const userGroup = sequelize.define('userGroup' , {
    id : {
        type :Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
        required:true
    },
    group_name : {
        type: Sequelize.STRING,
        required:true
    },
    group_status : {
        type: Sequelize.BOOLEAN,
        required:true
    },
    flag:{
        type:Sequelize.BOOLEAN,
        allowNull:true
    }

})

module.exports=userGroup;