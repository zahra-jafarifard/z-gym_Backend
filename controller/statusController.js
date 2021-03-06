const httpError = require("../shared/httpError");
const Status = require("../model/user-status");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator/check");

exports.postCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const { statusName } = req.body;
  if (!statusName) {
    throw new httpError("statusName Field Is Empty...", 422);
  }
  return Status.findOne({
    where: {
      status_name: statusName,
    },
  })
    .then((stName) => {
      if (stName) {
        throw new httpError("statusName is already exist... ", 500);
      }
      return Status.create({
        status_name: statusName,
        flag: 1,
      });
    })
    .then((createdStatus) => {
      // console.log(createdStatus)
      return res.status(201).json({
        message: `new statuse ${createdStatus.dataValues.status_name} created...`,
      });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postDelete = (req, res, next) => {
  const { id } = req.body;
  Status.findOne({
    where: {
      id: id,
      flag: 1,
    },
  })
    .then((status) => {
      console.log("staaatuuus", status);
      if (!status) {
        return next(new httpError("not found status...", 404));
      } else {
        // console.log('status id db', status.id);
        status.flag = 0;
        return status.save();
      }
    })
    .then(() => {
      res.status(200).json({ message: "Deleting is done..." });
    })
    .catch(() => {
      next(new httpError("Deleting Failed", 500));
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
  const name = req.body.name;

  Status.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((st) => {
      if (!st) {
        return next(new httpError("Doesnt Exist such a status...", 404));
      }
        st.status_name = name;
        return st.save().then(() => {
          res
            .status(200)
            .json({ message: "status name updated successfully..." });
        });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postList = (req, res, next) => {
  Status.findAll({
    where: {
      flag: 1,
    },
    // attributes:['status_name']
  })
    .then((statuses) => {
      res.status(200).json({ statuses: statuses });
    })
    .catch(() => {
      next(new httpError("Could'nd Fetch All Statuses...", 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { name } = req.body;
  if (!name) {
    Status.findAll()
      .then((st) => {
        res.status(200).json({ statuses: st });
      })
      .catch((e) => next(new httpError(e, 500)));
  }
  Status.findAll({
    attributes: ["status_name"],
    where: {
      status_name: name,
    },
  })
    .then((stus) => {
      // console.log('stus' , stus);
      res.status(200).json({ statuses: stus });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.fetchForUpdate = (req, res, next) => {
  console.log("fetchForUpdate");
  const { id } = req.body;
  Status.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((st) => {
      console.log("exeer", st.dataValues);
      res.status(200).json({ data: st.dataValues });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};
