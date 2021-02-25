const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin' , '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

const User = require('./model/user');
const Status = require('./model/user-status');
const Group = require('./model/user-group');
const Exercise = require('./model/exercise');
const Category = require('./model/category');

const httpError = require('./shared/httpError')
const sequelize = require('./model/sequelize');
const authRoute = require('./route/auth');
const statusRoute = require('./route/user-status');
const groupRoute = require('./route/user-group');
const categoryRoute = require('./route/category');
const equipmentRoute = require('./route/equipment');
const muscleRoute = require('./route/muscle');
const exerciseRoute = require('./route/exercise');

app.use(authRoute);
app.use('/user_status', statusRoute);
app.use('/user_group', groupRoute);
app.use('/category', categoryRoute);
app.use('/equipment', equipmentRoute);
app.use('/muscle', muscleRoute);
app.use('/exercise', exerciseRoute);

//handle 404 error
app.use(() => {
    throw new httpError('Could not find this route.', 404);
});

Status.hasMany(User 
  ,{
    foreignKey: {
      allowNull: false,
      defaultValue: 1
    }
  }
  );

 User.belongsTo(Status);

Group.hasMany(User
   ,{
    foreignKey: {
      allowNull: false,
      defaultValue: 1
    }
  });
 User.belongsTo(Group);

Exercise.belongsTo(Category);
// Category.hasMany(Exercise);

sequelize
.sync()
// .sync({force:true})
.then(() => {
    app.listen(5000 , ()=>{
        console.log('Server Connected... :)')
    });
})
.catch(e => {
    console.log('Connection Failed' , e)
})