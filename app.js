const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

app.use(bodyParser.json());


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: process.env.API_ADDRESS,
      description: 'Development server',
    },
  ],
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./route/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);





app.use('/upload' , express.static(path.join('upload')));

app.use('/GymRestAPIs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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

//Status table Association
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
Category.hasMany(Exercise);



sequelize
.sync()
// .sync({force:true})
.then(() => {
    app.listen(process.env.PORT , ()=>{
        console.log(`Your port is ${process.env.PORT}`);
    });
})
.catch(e => {
    console.log('Connection Failed' , e)
})