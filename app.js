const express = require("express");
const app = express();
const hemlet = require("helmet");
const path = require("path");
const RateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");

const User = require("./model/user");
const Status = require("./model/user-status");
const Group = require("./model/user-group");
const Exercise = require("./model/exercise");
const Category = require("./model/category");
const WorkOut = require("./model/workOut");
const WorkOutDetails = require("./model/workOutDetails");
const WorkDaysExer = require("./model/WorkDaysExer");
const DaysOfWeek = require("./model/daysOfWeek");
const Gym = require("./model/gym");
const GymType = require("./model/gymType");


const httpError = require("./shared/httpError");
const sequelize = require("./model/sequelize");
const authRoute = require("./route/auth");
const statusRoute = require("./route/user-status");
const groupRoute = require("./route/user-group");
const categoryRoute = require("./route/category");
const equipmentRoute = require("./route/equipment");
const muscleRoute = require("./route/muscle");
const exerciseRoute = require("./route/exercise");
const gymRoute = require("./route/gym");
const daysOfWeekRoute = require("./route/daysOfWeek");
const gymTypeRoute = require("./route/gymType");
const workOutRoute = require("./route/workOut");
require("dotenv").config();

app.use(bodyParser.json());

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const workOut = require("./model/workOut");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: process.env.API_ADDRESS,
      description: "Development server",
    },
  ],
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./route/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/upload", express.static(path.join("upload")));

//set proper http headers with helmet --> add 12 security headers to app
app.use(hemlet());

//Limit the rate of requests to prevent DoS attacks
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  delayMs: 0,
});
app.use("/GymRestAPIs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(authRoute);
app.use("/user_status", statusRoute);
app.use("/gym", gymRoute);
app.use("/user_group", groupRoute);
app.use("/category", categoryRoute);
app.use("/equipment", equipmentRoute);
app.use("/muscle", muscleRoute);
app.use("/exercise", exerciseRoute);
app.use("/daysOfWeek", daysOfWeekRoute);
app.use("/gymType", gymTypeRoute);
app.use("/workOut", workOutRoute);

//handle 404 error
app.use((req, res, next) => {
  console.log(req.get("host"));
  throw new httpError("Could not find this route.", 404);
});
// app.use((err , req ,res , next) => {
//   if (err) {
//     res.status(err.status || 500).json({ code: err.code || 'Error', message: err.toString() });
//   }
// });

// { onUpdate: 'cascade', hooks: true } ..... by default
Status.hasMany(User, { onDelete: "cascade", hooks: true });
User.belongsTo(Status, { onDelete: "cascade", hooks: true });

Group.hasMany(User, { onDelete: "cascade", hooks: true });
User.belongsTo(Group, { onDelete: "cascade", hooks: true });

Exercise.belongsTo(Category);
Category.hasMany(Exercise);


WorkOut.belongsTo(User, {  foreignKey: "creatorId" ,onDelete: "cascade", hooks: true});
WorkOut.belongsTo(User, {  foreignKey: "userId" ,onDelete: "cascade", hooks: true});

///////The best of both worlds: the Super Many-to-Many relationship
WorkOutDetails.belongsToMany(DaysOfWeek ,  { through: WorkDaysExer });
DaysOfWeek.belongsToMany(WorkOutDetails ,  { through: WorkDaysExer });

WorkOutDetails.belongsToMany(WorkOut ,  { through: WorkDaysExer });
WorkOut.belongsToMany(WorkOutDetails ,  { through: WorkDaysExer});

WorkOutDetails.belongsToMany(Exercise ,  { through: WorkDaysExer });
Exercise.belongsToMany(WorkOutDetails ,  { through: WorkDaysExer });

WorkOutDetails.hasMany(WorkDaysExer)
DaysOfWeek.hasMany(WorkDaysExer)
Exercise.hasMany(WorkDaysExer)
WorkOut.hasMany(WorkDaysExer)


//////
Gym.belongsTo(User, { foreignKey: "managerId", onDelete: "cascade", hooks: true});
// User.hasMany(Gym);

Gym.belongsTo(GymType , { onDelete: "cascade", hooks: true });
// GymType.hasMany(Gym);

sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0")
  .then(() => {
    // sequelize.sync();
    sequelize.sync({force:true})
  })

  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Your port is ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("Connection Failed", e);
  });
