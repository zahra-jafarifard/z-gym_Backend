const httpError = require("../shared/httpError");
const Equipment = require("../model/equipment");
const equipment = require("../model/equipment");
const { validationResult } = require("express-validator/check");

exports.postCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const { equipmentName } = req.body;
  if (!equipmentName) {
    throw new httpError("equipmentName Field Is Empty...", 422);
  }
  return Equipment.findOne({
    where: {
      equipment_name: equipmentName,
    },
  })
    .then((eqptName) => {
      if (eqptName) {
        throw new httpError("equipmentName is already exist... ", 500);
      }
      return Equipment.create({
        equipment_name: equipmentName,
        flag: 1,
      });
    })
    .then((createdEquipment) => {
      // console.log(createdEquipment)
      return res
        .status(201)
        .json({
          message: `new equipment ${createdEquipment.dataValues.equipment_name} created...`,
        });
    })
    .catch((e) => {
      next(new httpError("Fail in Fetching equipmentName ... ", 500));
    });
};

exports.postDelete = (req, res, next) => {
  const { id } = req.body;
  Equipment.findOne({
    where: {
      id: id,
      flag: 1,
    },
  })
    .then((equipment) => {
      // console.log('eeeequuiipment', equipment);
      if (!equipment) {
        return next(new httpError("not found equipment...", 404));
      } else {
        // console.log('equipment id db', equipment.id);
        equipment.flag = 0;
        return equipment.save();
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
  // console.log('reee ' , req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const id = +req.body.id ;
  const name = req.body.name;

  Equipment.findOne({
    where: {
      flag:1,
      id: id,
    },
  })
    .then((eqpt) => {
  console.log('eqpt ' , eqpt)

      if (!eqpt) {
        return next(new HttpError("there is not this equipment...", 404));
      }
      eqpt.equipment_name = name;
      eqpt.flag=1;
      return eqpt.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: "equipment name updated successfully..." });
    })
    .catch(() => {
      next(new httpError("Faild in fetching for updating", 500));
    });
};

exports.postList = (req, res, next) => {
  Equipment.findAll({
    where: {
      flag: 1,
    },
    // attributes:['equipment_name']
  })
    .then((equipment) => {
      res.status(200).json({ equipment: equipment });
    })
    .catch(() => {
      next(new httpError("Could'nd Fetch All equipmentes...", 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { equipmentName } = req.body;
  if (!equipmentName) {
    Equipment.findAll()
      .then((eq) => {
        res.status(200).json({ equipment: eq });
      })
      .catch((e) => next(new httpError(e, 500)));
  }
  Equipment.findAll({
    attributes: ["equipment_name"],
    where: {
      equipment_name: equipmentName,
    },
  })
    .then((eqp) => {
      // console.log('eqp' , eqp);
      res.status(200).json({ equipment: eqp });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.fetchForUpdate = (req, res, next) => {
  console.log("fetchForUpdate");
  const { id } = req.body;
  Equipment.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((eqp) => {
      console.log("exeer", eqp.dataValues);
      res.status(200).json({data: eqp.dataValues})
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};