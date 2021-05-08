const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator/check");

const httpError = require("../shared/httpError");
const User = require("../model/user");
const userGroup = require("../model/user-group");
const userStatus = require("../model/user-status");

exports.postRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const {
    name,
    lastName,
    mobile,
    password,
    repaetPassword,
    gender,
    birthDay,
    height,
    weight,
  } = req.body;
  console.log(req.body);
  // if (!name || !lastName || !mobile || !password || !repaetPassword || !gender || !birthDay || !height || !weight){
  //     throw new httpError('unauthurized  user...' , 401);
  // }
  // if (password !== repaetPassword) {
  //   throw new httpError("password and repeat arent match...", 401);
  // }
  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      console.log(hashPassword);
      return User.findOne({
        where: {
          mobile: mobile,
        },
      })
        .then((user) => {
          if (!user) {
            return User.create({
              name,
              lastName,
              mobile,
              password: hashPassword,
              gender,
              birthDay,
              height,
              weight,
              flag: 1,
            });
          } else {
            next(new httpError("User Already Exist...", 500));
          }
        })
        .then((createdUser) => {
          return res.status(201).json({ user: createdUser });
        });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log('errors.array()' , errors)
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const { mobile, password, rememberMe } = req.body;
  // console.log('reeeq',req.body);
  let token;
  if (!mobile || !password) {
    throw new httpError("unauthurized  user...", 401);
  }
  return User.findOne({
    where: {
      mobile: mobile,
    },
  }).then((user) => {
    if (!user) {
      next(new httpError("Doesnt Exist such a User...", 422));
      res.status(422).json({ error: "Doesnt Exist such a User..." });
    }
    return bcrypt
      .compare(password, user.password)
      .then((matchPass) => {
        if (!matchPass) {
          throw new httpError("invalid password...", 401);
        } else {
          if (rememberMe) {
            token = jwt.sign(
              { mobile: user.mobile, userId: user.id },
              "mySecretKey",
              // { expiresIn: "2h" }
            );
          } else {
            token = jwt.sign(
              { mobile: user.mobile, userId: user.id },
              "mySecretKey",
              // { expiresIn: Date.now() + 3600 }
            );
          }
          user.token = token;
          return user.save().then(() => {
            // const decodedToken = jwt.verify(token, "mySecretKey")
            // console.log("decodedToken1:", decodedToken);
            // const exp=new Date(decodedToken.exp)
            // console.log("decodedToken1:", exp);
            res
              .status(200)
              .json({ userMobile: user.dataValues.mobile, token: token });
            // .json({ userMobile: user.dataValues.mobile, token: token , expiresIn:exp});
          });
        }
      })
      .catch((err) => {
        // next(new httpError(err, 500));
        res.status(500).json({ error: err.message });
      });
  });
};

exports.postForgetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const { mobile } = req.body;
  console.log("mobile", mobile);
  const resetPassToken = crypto.randomBytes(32).toString("hex");
  const rndNumber = Math.floor(Math.random() * 100000);
  User.findOne({
    where: {
      mobile: mobile,
    },
  })
    .then((user) => {
      if (!user) {
        return next(new httpError("could not find user", 404));
      }
      user.rndNumber = rndNumber;
      user.resetToken = resetPassToken;
      user.resetTokenExpiration = Date.now() + 3600000;
      return user.save();
    })
    .then(() => {
      console.log("resetPassToken", resetPassToken);
      res
        .status(200)
        .json({ resetToken: resetPassToken, rndNumber: rndNumber });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postSetNewPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const token = req.params.resetToken;
  const randomNumber = req.body.randomNumber;
  const newPassword = req.body.newPassword;
  console.log("set nreewww paaas", token, newPassword, randomNumber);
  let updatedUser;
  User.findOne({
    where: {
      rndNumber: randomNumber,
      resetToken: token,
      resetTokenExpiration: { [Op.gt]: Date.now() },
    },
  })
    .then((user) => {
      updatedUser = user;
      if (!user) {
        return next(new httpError("could not find user", 404));
      }
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedpass) => {
      if (!hashedpass) {
        return next(new httpError("hash pass error...", 500));
      }
      updatedUser.password = hashedpass;
      return updatedUser.save();
    })
    .then(() => {
      res.status(200).json({ message: "reset password done..." });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postFetchMembers = (req, res, next) => {
  return User.findAll({
    where: {
      flag: 1,
    },
    attributes: [
      "id",
      "name",
      "lastName",
      "mobile",
      "gender",
      "birthDay",
      "height",
      "weight",
    ],
    include: [
      {
        model: userGroup,

        attributes: ["group_name"],
      },
      {
        model: userStatus,

        attributes: ["status_name"],
      },
    ],
  })
    .then((members) => {
      // console.log('meeeeeemmembers', m.dataValues)
      const mem = [];
      members.map((m) => {
        mem.push(m.dataValues);
      });
      // console.log("meeeeeem", mem);
      return res.json({ members: mem });
    })
    .catch((e) => {
      next(new httpError(e.message, 500));
    });
};

exports.postFetchMember = (req, res, next) => {
  // console.log("parrrramid", req.params.id);
  const id = req.params.id;
  return User.findOne({
    where: {
      flag: 1,
      id: id,
    },
    attributes: [
      "id",
      "name",
      "lastName",
      "mobile",
      "gender",
      "birthDay",
      "height",
      "weight",
    ],
    include: [
      {
        model: userGroup,

        attributes: ["group_name"],
      },
      {
        model: userStatus,

        attributes: ["status_name"],
      },
    ],
  })
    .then((member) => {
      // console.log("mmmmeeeem", member.dataValues);
      // console.log("m1", member.dataValues.userGroup.dataValues.group_name);
      // console.log("m2", member.dataValues.userStatus.dataValues.status_name);

      return res.json({
        user: member.dataValues,
        status: member.dataValues.userStatus.dataValues.status_name,
        group: member.dataValues.userGroup.dataValues.group_name,
      });
    })
    .catch((e) => {
      next(new httpError(e.message, 500));
    });
};

exports.postSearchMembers = (req, res, next) => {
  const { name, lastName, mobile, birthDay, weight, height, gender } = req.body;
  // if(!name && !lastName && !mobile  && !weight && !height && !gender){
  //  User.findAll({})
  // .then(u=>{
  //     res.status(200).json({members:u})
  // })
  // .catch(e => next(new httpError(e , 500)))
  // throw(new httpError('unauthurized  user...' , 401));
  // }
  // console.log('boooody' , req.body)
  User.findAll({
    attributes: [
      "name",
      "lastName",
      "mobile",
      "gender",
      "birthDay",
      "height",
      "weight",
    ],
    include: [
      {
        model: userGroup,
        attributes: ["group_name"],
      },
      {
        model: userStatus,
        attributes: ["status_name"],
      },
    ],
    where: {
      [Op.or]: [
        { name: name },
        { lastName: lastName },
        { mobile: mobile },
        { weight: weight },
        //  {birthDay:birthDay},
        { height: height },
        { gender: gender },
      ],
    },
  })
    .then((mems) => {
      const members = [];
      mems.map((m) => {
        return members.push(m.dataValues);
      });
      console.log("meeeeeeeembers", members);
      return res.status(200).json({ members: members });
    })
    .catch((e) => {
      next(new httpError(e, 500));
      // console.log(e)
    });
};

exports.postCreateMember = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const {
    name,
    lastName,
    mobile,
    password,
    birthDay,
    weight,
    height,
    gender,
    status,
    group,
  } = req.body;
  console.log("boooooody", req.body);
  // if (!name || !lastName || !mobile || !password || !gender || !birthDay || !height || !weight || !status || !group){
  //     throw(new httpError('unauthurized  user...' , 401));
  // }

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      // console.log(hashPassword);
      return User.findOne({
        where: {
          mobile: mobile,
          flag:1
        },
      }).then((user) => {
        if (user) {
          next(new httpError("User Already Exist...", 500));
          res.status(500).json({ error: "User Already Exist..." });
        } else {
          if(!status && !group){
             return User.create({
              name,
              lastName,
              mobile,
              password: hashPassword,
              gender,
              birthDay,
              height,
              weight,
              flag: 1,
            })
          }else{ 
           return User.create({
            name,
            lastName,
            mobile,
            password: hashPassword,
            gender,
            birthDay,
            height,
            weight,
            userStatusId: status,
            userGroupId: group,
            flag: 1,
          })
        }
          
        }
      })
      .then((createdUser) => {
        // console.log('createdUUUser' , createdUser)
        return res.status(201).json({ user: createdUser });
      });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postUpdateMember = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  let {
    name,
    lastName,
    mobile,
    status,
    birthDay,
    weight,
    height,
    gender,
    group,
    password,
  } = req.body;
  console.log("boddddy", req.body);

  User.findOne({
    where: {
      flag: 1,
      mobile: mobile,
    },
    // include: [
    //   {
    //     model: userGroup,
    //     attributes: ["group_name"],
    //   },
    //   {
    //     model: userStatus,
    //     attributes: ["status_name"],
    //   },
    // ],
  })
    .then((member) => {
      if (!member) {
        return next(new httpError("not found member...", 404));
      }
      if(!group && !status){
        (member.name = name),
        (member.lastName = lastName),
        (member.mobile = mobile),
        (member.birthDay = birthDay),
        (member.weight = weight),
        (member.height = height),
        (member.gender = gender);
      return member.save();
      }else{

        (member.userGroupId = group),
        (member.userStatusId = status),
        (member.name = name),
        (member.lastName = lastName),
        (member.mobile = mobile),
        (member.birthDay = birthDay),
        (member.weight = weight),
        (member.height = height),
        (member.gender = gender);
        return member.save();
      }
      // }
    })
    .then((updatedMember) => {
      console.log("updatedMember", updatedMember.dataValues);

      res.status(200).json({ updatedMember: updatedMember });
    })
    .catch((err) => {
      next(new httpError(err, 500));
    });
};

exports.postDeleteMember = (req, res, next) => {
  const { id } = req.body;
  console.log("postDeleteMember", id);

  User.findOne({
    where: {
      id: id,
      flag: 1,
    },
  })
    .then((user) => {
      // console.log('uuuussssserrr', user);
      if (!user) {
        return next(new httpError("not found user...", 404));
      } else {
        // console.log('user id db', user.id);
        user.flag = 0;
        return user.save();
      }
    })
    .then((deletedUser) => {
      console.log("dddddd", deletedUser);
      res.status(200).json({ message: "Deleting is done..." });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.fetchForUpdate = (req, res, next) => {
  const { id } = req.body;
  User.findOne({
    where: {
      flag: 1,
      id: id,
    },
  })
    .then((usr) => {
      // console.log("user", usr.dataValues);
      res.status(200).json({ data: usr.dataValues });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};
