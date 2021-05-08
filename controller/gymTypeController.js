const httpError = require("../shared/httpError");
const GymType = require("../model/gymType");
const { validationResult } = require("express-validator/check");

exports.postCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const { name } = req.body;
  if (!name) {
    throw new httpError("name Field Is Empty...", 422);
  }
  return GymType.findOne({
    where: {
      flag: 1,
      name: name,
    },
  })
    .then((gType) => {
      if (gType) {
        throw new httpError("name is already exist... ", 500);
      }
      return GymType.create({
        flag: 1,
        name: name,
      });
    })
    .then((gymType) => {
      // console.log(gymType)
      return res.status(200).json({
        message: `new gymType ${gymType.dataValues.name} created...`,
      });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postDelete = (req, res, next) => {
  const { id } = req.body;
  console.log("caaat id", id);
  GymType.findOne({
    where: {
        flag: 1,
      id: id,
    },
  })
    .then((gType) => {
      // console.log("caaaaaaat", gType);
      // console.log("caaaaaaatdatavalues", gType.dataValues);
      if (!gType) {
        return next(new httpError("not found gType...", 404));
      } else {
        // console.log('gType id db', gType.id);
        gType.flag = 0;
        return gType.save();
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
  const name = req.body.name;
  console.log("namecaaat", name);
  GymType.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((gType) => {
      console.log("namecaaatdddd", gType);

      if (!gType) {
        return next(new HttpError("there is not this gType...", 404));
      }
      gType.name = name;
      return gType.save().then(() => {
        res.status(200).json({ message: "gType name updated successfully..." });
      });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postList = (req, res, next) => {
  GymType.findAll({
    where: {
      flag: 1,
    },
  })
    .then((gTypes) => {
      // console.log('caaaa' ,gTypes)
      res.status(200).json({ gTypes: gTypes });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { name } = req.body;
//   if (!name) {
//     GymType.findAll()
//       .then((days) => {
//         res.status(200).json({ days: days });
//       })
//       .catch((e) => next(new httpError(e, 500)));
//   }
  GymType.findAll({
    attributes: ["name"],
    where: {
      name: name,
    },
  })
    .then((gTypes) => {
      // console.log('days' , gTypes);
      res.status(200).json({ gTypes: gTypes });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.fetchForUpdate = (req, res, next) => {
  console.log("fetchForUpdate");
  const { id } = req.body;
  GymType.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((gType) => {
      console.log("exeer", gType.dataValues);
      res.status(200).json({ data: gType.dataValues });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};
