const httpError = require("../shared/httpError");
const WorkOut = require("../model/workOut");
const GymType = require("../model/gymType");
const User = require("../model/user");
const { validationResult } = require("express-validator/check");

exports.postCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }

  let { name, phoneNumber, gender, status, address, location } = req.body;

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
        name: name,
        phoneNumber,
        gender,
        status,
        address,
        location,
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
  console.log("gym id", id);
  WorkOut.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((gym) => {
      // console.log("caaaaaaat", gym);
      // console.log("caaaaaaatdatavalues", gym.dataValues);
      if (!gym) {
        return next(new httpError("not found gym...", 404));
      } else {
        // console.log('gym id db', gym.id);
        gym.flag = 0;
        return gym.save();
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
  let { name, phoneNumber, gender, status, address, location } = req.body;

  console.log("nameggyyym", name);
  WorkOut.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((gym) => {
      console.log("namecaaatdddd", gym);

      if (!gym) {
        return next(new HttpError("there is not this gym...", 404));
      }
      gym.name = name;
      gym.phoneNumber = phoneNumber;
      gym.gender = gender;
      gym.status = status;
      gym.address = address;
      gym.location = location;
      return gym.save().then(() => {
        res.status(200).json({ message: "gym name updated successfully..." });
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
  })
    .then((gyms) => {
      // console.log('gyms' ,gyms)
      res.status(200).json({ gyms: gyms });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { name, phoneNumber, gender, status, address, location } = req.body;

  WorkOut.findAll({
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
        { name: name },
        { phoneNumber: phoneNumber },
        { status: status },
        { address: address },
        { location: location },
        { gender: gender },
      ],
    },
  })
    .then((gyms) => {
      // console.log('gyms' , gyms);
      res.status(200).json({ gyms: gyms });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.fetchForUpdate = (req, res, next) => {
  console.log("fetchForUpdate");
  const { id } = req.body;
  WorkOut.findOne({
    where: {
      flag: 1,
      id: id,
    },
    include: [
      {
        model: User,
        attributes: ["name" , "lastName" , "mobile"],
      },
    ],
  })
    .then((gym) => {
      console.log("exeer", gym.dataValues);
      res.status(200).json({ data: gym.dataValues });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};