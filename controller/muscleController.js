const httpError = require("../shared/httpError");
const Muscle = require("../model/muscle");
const muscle = require("../model/muscle");
const { validationResult } = require("express-validator/check");

exports.postCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const { muscleName } = req.body;
  if (!muscleName) {
    throw new httpError("muscleName Field Is Empty...", 422);
  }
  return Muscle.findOne({
    where: {
      muscle_name: muscleName,
    },
  })
    .then((mslName) => {
      if (mslName) {
        throw new httpError("muscleName is already exist... ", 500);
      }
      return Muscle.create({
        muscle_name: muscleName,
        flag: 1,
      });
    })
    .then((createdMuscle) => {
      return res
        .status(201)
        .json({
          message: `new muscle ${createdMuscle.dataValues.muscle_name} created...`,
        });
    })
    .catch(() => {
      next(new httpError("Fail in Fetching muscleName ... ", 500));
    });
};

exports.postDelete = (req, res, next) => {
  const { id } = req.body;
  Muscle.findOne({
    where: {
      id: id,
      flag: 1,
    },
  })
    .then((muscle) => {
      console.log("muuuuscle", muscle);
      if (!muscle) {
        return next(new httpError("not found muscle...", 404));
      } else {
        // console.log('muscle id db', muscle.id);
        muscle.flag = 0;
        return muscle.save();
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
  const id = +req.body.id + 1;
  const name = req.body.name;

  Muscle.findOne({
    where: {
      id: id,
    },
  })
    .then((muscle) => {
      if (!muscle) {
        return next(new HttpError("there is not this muscle...", 404));
      }
      muscle.muscle_name = name;
      return muscle.save();
    })
    .then(() => {
      res.status(200).json({ message: "muscle name updated successfully..." });
    })
    .catch(() => {
      next(new httpError("Faild in fetching for updating", 500));
    });
};

exports.postList = (req, res, next) => {
  Muscle.findAll({
    where: {
      flag: 1,
    },
    // attributes:['muscle_name']
  })
    .then((muscles) => {
      res.status(200).json({ muscles: muscles });
    })
    .catch(() => {
      next(new httpError("Could'nd Fetch All muscles...", 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { muscleName } = req.body;
  if (!muscleName) {
    Muscle.findAll()
      .then((msl) => {
        res.status(200).json({ muscle: msl });
      })
      .catch((e) => next(new httpError(e, 500)));
  }
  Muscle.findAll({
    attributes: ["muscle_name"],
    where: {
      muscle_name: muscleName,
    },
  })
    .then((msle) => {
      // console.log('msle' , msle);
      res.status(200).json({ muscle: msle });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};
