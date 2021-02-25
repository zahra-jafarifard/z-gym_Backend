const Sequelize = require('sequelize');

const sequelize = require('./sequelize');
const userStatus = sequelize.define('userStatus' , {
    id : {
        type :Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
        required:true
    },
    status_name : {
        type: Sequelize.STRING,
        required:true
    }

})

module.exports=userStatus;