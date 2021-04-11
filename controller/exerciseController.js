const httpError = require("../shared/httpError");
const Exercise = require("../model/exercise");
const Category = require("../model/category");
const { Op } = require("sequelize");
const exercise = require("../model/exercise");

exports.postCreate = (req, res, next) => {
  const { name, description, icon, category } = req.body;
  if (!req.file) {
    return next(new HttpError("no file in req.file...", 422));
  }
  // console.log('bodddy' , req.body)
  // if (!name || !description || !icon || !category ){
  //     throw(new httpError('Field(s) Is Empty...' , 422));
  // }
  Exercise.findOne({
    where: {
      name: name,
    },
  })
    .then((exerName) => {
      if (exerName) {
        throw new httpError("exerciseName is already exist... ", 500);
      }
      return Exercise.create({
        name: name,
        description: description,
        icon: req.file.path,
        categoryId: category,
        flag: 1,
      });
    })
    .then((createdExercise) => {
      // console.log('exxxxrrr' , createdExercise)
      return res
        .status(201)
        .json({
          message: `new exercise ${createdExercise.dataValues.name} created...`,
        });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postDelete = (req, res, next) => {
  const { id } = req.body;
  Exercise.findOne({
    where: {
      id: id,
      flag: 1,
    },
  })
    .then((exercise) => {
      console.log("exxxxxerrr", exercise);
      if (!exercise) {
        return next(new httpError("not found exercise...", 404));
      } else {
        // console.log('exercise id db', exercise.id);
        exercise.flag = 0;
        return exercise.save();
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
  let catId;
  const id = +req.body.id + 1;
  const { name, description, category } = req.body;
  // console.log('reeeeeq' , req.body);
  if (!req.file) {
    return next(new HttpError("no file in req.file...", 422));
  }
  Category.findOne({
    where: {
      category_name: category,
    },
  })
    .then((cat) => {
      // console.log('caaat' , cat)
      if (cat) {
        catId = cat.dataValues.id;
      } else {
        catId = category;
      }
    })
    .catch((e) => console.log(e));

  Exercise.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Category,
        attributes: ["category_name"],
      },
    ],
  })
    .then((exercise) => {
      if (!exercise) {
        return next(new HttpError("there is not this exercise...", 404));
      }
      if (!req.file) {
        exercise.name = name;
        exercise.description = description;
        exercise.categoryId = catId;
        return exercise.save();
      } else {
        exercise.name = name;
        exercise.description = description;
        exercise.icon = req.file.path;
        exercise.categoryId = catId;
        return exercise.save();
      }
    })
    .then(() => {
      res
        .status(200)
        .json({ message: "exercise name updated successfully..." });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postList = (req, res, next) => {
  Exercise.findAll({
    where: {
      flag: 1,
    },
    // attributes:[ 'name' , 'description' , 'icon' ],
    include: [
      {
        model: Category,
        attributes: ["category_name"],
      },
    ],
  })
    .then((exercises) => {
      // console.log('exxxcaa' , exercises[0].dataValues)
      const exer = [];
      exercises.map((e) => {
        exer.push(e.dataValues);
        // console.log('exxxcaa' , e.category.dataValues.category_name)
      });
      res.status(200).json({ exercises: exer });
    })
    .catch(() => {
      next(new httpError("Could'nt Fetch All exercises...", 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { name, description } = req.body;
  // console.log('booo' , req.body)
  let catId;

  if (!name && !description) {
    Exercise.findAll({
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
      ],
      attributes: ["name", "description", "icon"],
    })
      .then((e) => {
        res.status(200).json({ exercises: e });
      })
      .catch((e) => next(new httpError(e, 500)));
  }
  Exercise.findAll({
    attributes: ["name", "description", "icon"],
    where: {
      [Op.or]: [{ name: name }, { description: description }],
    },
    include: [
      {
        model: Category,
        attributes: ["category_name"],
      },
    ],
  })
    .then((exercises) => {
      // console.log('exercises' , exercises);
      const exer = [];
      exercises.map((e) => {
        exer.push(e.dataValues);
        // console.log('exxxcaa' , e.category.dataValues.category_name)
      });
      // console.log('exxx' , exer);

      res.status(200).json({ exercises: exer });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};
