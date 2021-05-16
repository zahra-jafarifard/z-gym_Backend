const httpError = require("../shared/httpError");
const workOutDetails = require("../model/workOutDetails");
const User = require("../model/user");
const { validationResult } = require("express-validator/check");

exports.postCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }

  let {days , exercise , workout, reps , set , weight , description } = req.body;

 
    return workOutDetails.create({
      flag: 1,
      days ,
      exercise ,
      workout,
      reps , 
      set , 
      weight , 
      description
    })
    .then((createdWork) => {
      // console.log(createdWork);
      return res.status(200).json({
        message: `new createdWork ${createdWork.dataValues.name} created...`,
      });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postDelete = (req, res, next) => {
  const { id } = req.body;
  console.log("workOutDetails id", id);
  workOutDetails.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((workOutD) => {
      // console.log("caaaaaaat", workOutD);
      // console.log("caaaaaaatdatavalues", workOutD.dataValues);
      if (!workOutD) {
        return next(new httpError("not found workOutD...", 404));
      } else {
        // console.log('workOutD id db', workOutD.id);
        workOutD.flag = 0;
        return workOutD.save();
      }
    })
    .then(() => {
      res.status(200).json({ message: "Deleting is done..." });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postUpdate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const id = +req.body.id;
  
  let {days , exercise , workout, reps , set , weight , description } = req.body;
  workOutDetails.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((workOutD) => {
      console.log("namecaaatdddd", workOutD);

      if (!workOutD) {
        return next(new HttpError("there is not this workOutD...", 404));
      }
      workOutD.daysOfWeekId = days;
      workOutD.exerciseId =exercise;
      workOutD.workoutId = workout;
      workOutD.reps = reps;
      workOutD.set = set;
      workOutD.weight = weight;
      workOutD.description = description;
      return workOutD.save().then(() => {
        res.status(200).json({ message: "workOutD name updated successfully..." });
      });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postList = (req, res, next) => {
    workOutDetails.findAll({
    where: {
      flag: 1,
    },
  })
    .then((workOutDetails) => {
      // console.log('workOutDetails' ,workOutDetails)
      res.status(200).json({ workOutDetails: workOutDetails });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postSearch = (req, res, next) => {
  
  let {days , exercise , workout, reps , set , weight , description } = req.body;
  workOutDetails.findAll({
    attributes: [
      "name",
      "phoneNumber",
      "gender",
      "status",
      "address",
      "location",
    ],
    where: {
      [Op.or]: [
        { daysOfWeekId: days },
        { exerciseId: exercise },
        { workoutId: workout },
        { reps: reps },
        { set: set },
        { weight: weight },
        { description: description },
      ],
    },
  })
    .then((workOutDetails) => {
      // console.log('workOutDetails' , workOutDetails);
      res.status(200).json({ workOutDetails: workOutDetails });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.fetchForUpdate = (req, res, next) => {
  console.log("fetchForUpdate");
  const { id } = req.body;
  workOutDetails.findOne({
    where: {
      flag: 1,
      id: id,
    },
    // include: [
    //   {
    //     model: User,
    //     attributes: ["name" , "lastName" , "mobile"],
    //   },
    // ],
  })
    .then((workOutD) => {
      console.log("exeer", workOutD.dataValues);
      res.status(200).json({ data: workOutD.dataValues });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};