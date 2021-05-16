const httpError = require("../shared/httpError");
const WorkOut = require("../model/workOut");
const User = require("../model/user");
const { validationResult } = require("express-validator/check");
const { Op } = require("sequelize");

exports.postCreate = (req, res, next) => {
  console.log("req.body");

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res
  //     .status(422)
  //     .json({ message: "validation failed", error: errors.array() });
  // }

  let { name, description, startDate, endDate, createdBy, user } = req.body;
  console.log("reeeeeeeeeeeq",req.body);

  return WorkOut.findOne({
    where: {
      flag: 1,
      name: name,
    },
  })
    .then((workNme) => {
      if (workNme) {
        throw new httpError("workout name is already exist... ", 500);
      }
      return WorkOut.create({
        name,
        description,
        startDate,
        endDate,
        creatorId:createdBy,
        userId:user,
        flag: 1,
      });
    })
    .then((createdWork) => {
      // console.log(createdWork)
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
  console.log("work id", id);
  WorkOut.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((work) => {
      // console.log("caaaaaaat", work);
      // console.log("caaaaaaatdatavalues", work.dataValues);
      if (!work) {
        return next(new httpError("not found work...", 404));
      } else {
        // console.log('work id db', work.id);
        work.flag = 0;
        return work.save();
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
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res
  //     .status(422)
  //     .json({ message: "validation failed", error: errors.array() });
  // }
  const id = +req.body.id;
  let { name, description, startDate, endDate, createdBy, user } = req.body;
  console.log(req.body);

  WorkOut.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((work) => {

      if (!work) {
        return next(new HttpError("there is not this work...", 404));
      }
      work.name = name;
      work.description = description;
      work.startDate = startDate;
      work.endDate = endDate;
      work.creatorId = createdBy;
      work.userId = user;
      return work.save().then(() => {
        res.status(200).json({ message: "work name updated successfully..." });
      });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postList = (req, res, next) => {
  WorkOut.findAll({
    where: {
      flag: 1,
    },
    include: [
      {
        model: User,
        attributes: ["id", "name", "lastName"],
      },
    ],
  })
    .then((workOuts) => {
      // console.log('workOuts' ,workOuts)
      res.status(200).json({ workOuts: workOuts });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { name, description, startDate, endDate } = req.body;

  // console.log(req.body );

  WorkOut.findAll({
    where: {
      [Op.or]: [
        { name: name },
        { description: description },
        // { startDate: startDate},
        // { endDate: endDate},
      ],
    },
    include: [
      {
        model: User,
        attributes: ["id", "name", "lastName"],
      },
    ],
  })
    .then((workOuts) => {
      // console.log('workOuts' , workOuts);
      res.status(200).json({ workOuts: workOuts });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.fetchForUpdate = (req, res, next) => {
  const { id } = req.body;
  WorkOut.findOne({
    where: {
      flag: 1,
      id: id,
    },
    include: [
      {
        model: User,
        attributes: ["id","name", "lastName"],
      },
    ],
  })
    .then((w) => {
      // console.log("wooork", w.dataValues);
      res.status(200).json({ data: w.dataValues });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};
