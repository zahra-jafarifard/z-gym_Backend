const httpError = require("../shared/httpError");
const Category = require("../model/category");
const { validationResult } = require("express-validator/check");

exports.postCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const { categoryName } = req.body;
  if (!categoryName) {
    throw new httpError("categoryName Field Is Empty...", 422);
  }
  return Category.findOne({
    where: {
      category_name: categoryName,
    },
  })
    .then((catName) => {
      if (catName) {
        throw new httpError("categoryName is already exist... ", 500);
      }
      return Category.create({
        category_name: categoryName,
        flag: 1,
      });
    })
    .then((createdCategory) => {
      // console.log(createdCategory)
      return res
        .status(200)
        .json({
          message: `new category ${createdCategory.dataValues.category_name} created...`,
        });
    })
    .catch((e) => {
      next(new httpError("Fail in Fetching categoryName ... ", 500));
    });
};

exports.postDelete = (req, res, next) => {
  const { id } = req.body;
  console.log("caaat id", id);
  Category.findOne({
    where: {
      id: id,
      flag: 1,
    },
  })
    .then((cat) => {
      // console.log("caaaaaaat", cat);
      // console.log("caaaaaaatdatavalues", cat.dataValues);
      if (!cat) {
        return next(new httpError("not found category...", 404));
      } else {
        // console.log('cat id db', cat.id);
        cat.flag = 0;
        return cat.save();
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
  const id = +req.body.id ;
  const name = req.body.name;
console.log('namecaaat' , name)
  Category.findOne({
    where: {
      flag:1,
      id: id,

    },
  })
    .then((cat) => {
console.log('namecaaatdddd' , cat)

      if (!cat) {
        return next(new HttpError("there is not this category...", 404));
      }
      cat.category_name = name;
      return cat.save()
      .then(() => {
        res
          .status(200)
          .json({ message: "category name updated successfully..." });
      })
    })
    .catch(() => {
      next(new httpError("Faild in fetching for updating", 500));
    });
};

exports.postList = (req, res, next) => {
  Category.findAll({
    where: {
      flag: 1,
    },
    // attributes:['category_name']
  })
    .then((categories) => {
      // console.log('caaaa' ,categories)
      res.status(200).json({ categories: categories });
    })
    .catch(() => {
      next(new httpError("Could'nd Fetch All categoryes...", 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { name } = req.body;
  if (!name) {
    Category.findAll()
      .then((cat) => {
        res.status(200).json({ categories: cat });
      })
      .catch((e) => next(new httpError(e, 500)));
  }
  Category.findAll({
    attributes: ["category_name"],
    where: {
      category_name: name,
    },
  })
    .then((cats) => {
      // console.log('cats' , cats);
      res.status(200).json({ categories: cats });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};


exports.fetchForUpdate = (req, res, next) => {
  console.log("fetchForUpdate");
  const { id } = req.body;
  Category.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((cat) => {
      console.log("exeer", cat.dataValues);
      res.status(200).json({data: cat.dataValues})
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};