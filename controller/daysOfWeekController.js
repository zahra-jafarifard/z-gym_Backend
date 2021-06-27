const httpError = require("../shared/httpError");
const DaysOfWeek = require("../model/daysOfWeek");
const { validationResult } = require("express-validator/check");

// exports.postCreate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res
//       .status(422)
//       .json({ message: "validation failed", error: errors.array() });
//   }
//   const { name } = req.body;
//   if (!name) {
//     throw new httpError("name Field Is Empty...", 422);
//   }
//   return DaysOfWeek.findOne({
//     where: {
//       flag: 1,
//       name: name,
//     },
//   })
//     .then((dayName) => {
//       if (dayName) {
//         throw new httpError("name is already exist... ", 500);
//       }
//       return DaysOfWeek.create({
//         flag: 1,
//         name: name,
//       });
//     })
//     .then((day) => {
//       // console.log(day)
//       return res.status(200).json({
//         message: `new day ${day.dataValues.name} created...`,
//       });
//     })
//     .catch((e) => {
//       next(new httpError(e, 500));
//     });
// };

// exports.postDelete = (req, res, next) => {
//   const { id } = req.body;
//   console.log("caaat id", id);
//   DaysOfWeek.findOne({
//     where: {
//       id: id,
//       flag: 1,
//     },
//   })
//     .then((day) => {
//       // console.log("caaaaaaat", day);
//       // console.log("caaaaaaatdatavalues", day.dataValues);
//       if (!day) {
//         return next(new httpError("not found day...", 404));
//       } else {
//         // console.log('day id db', day.id);
//         day.flag = 0;
//         return day.save();
//       }
//     })
//     .then(() => {
//       res.status(200).json({ message: "Deleting is done..." });
//     })
//     .catch((e) => {
//       next(new httpError(e, 500));
//     });
// };

// exports.postUpdate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res
//       .status(422)
//       .json({ message: "validation failed", error: errors.array() });
//   }
//   const id = +req.body.id;
//   const name = req.body.name;
//   console.log("namecaaat", name);
//   DaysOfWeek.findOne({
//     where: {
//       flag: 1,
//       id: id,
//     },
//   })
//     .then((day) => {
//       console.log("namecaaatdddd", day);

//       if (!day) {
//         return next(new HttpError("there is not this day...", 404));
//       }
//       day.name = name;
//       return day.save().then(() => {
//         res.status(200).json({ message: "day name updated successfully..." });
//       });
//     })
//     .catch((e) => {
//       next(new httpError(e, 500));
//     });
// };



// exports.postSearch = (req, res, next) => {
//   let { name } = req.body;
//   if (!name) {
//     DaysOfWeek.findAll()
//       .then((days) => {
//         res.status(200).json({ days: days });
//       })
//       .catch((e) => next(new httpError(e, 500)));
//   }
//   DaysOfWeek.findAll({
//     attributes: ["name"],
//     where: {
//       name: name,
//     },
//   })
//     .then((days) => {
//       // console.log('days' , days);
//       res.status(200).json({ days: days });
//     })
//     .catch((e) => {
//       next(new httpError(e, 500));
//     });
// };

exports.postList = (req, res, next) => {
  DaysOfWeek.findAll({
    where: {
      flag: 1,
    },
  })
    .then((days) => {
      // console.log('caaaa' ,days)
      res.status(200).json({ days: days });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.fetchForUpdate = (req, res, next) => {
  console.log("fetchForUpdate");
  const { id } = req.body;
  DaysOfWeek.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((day) => {
      console.log("exeer", day.dataValues);
      res.status(200).json({ data: day.dataValues });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

