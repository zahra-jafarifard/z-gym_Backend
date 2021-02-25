const Sequelize = require('sequelize');

const sequelize = require('./sequelize');
const muscle = sequelize.define('muscle' , {
    id : {
        type :Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
        required:true
    },
    muscle_name : {
        type: Sequelize.STRING,
        required:true
    }

})

module.exports=muscle;