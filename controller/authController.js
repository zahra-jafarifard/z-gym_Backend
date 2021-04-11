const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");

const httpError = require("../shared/httpError");
const User = require("../model/user");
const userGroup = require("../model/user-group");
const userStatus = require("../model/user-status");

exports.postRegister = (req, res, next) => {
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
  // if(password != repaetPassword){
  //     throw new httpError('password and repeat arent match...' , 401)
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
          // console.log('createdUUUser' , createdUser)
          return res.status(201).json({ user: createdUser });
        });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};
exports.postLogin = (req, res, next) => {
  const { mobile, password, rememberMe } = req.body;
  // console.log('reeeq',req.body);
  // let token;
  if (!mobile || !password) {
    throw new httpError("unauthurized  user...", 401);
  }
  return User.findOne({
    where: {
      mobile: mobile,
    },
  })
    .then((user) => {
      if (!user) {
        next(new httpError("Doesnt Exist such a User...", 404));
      }
      return bcrypt
        .compare(password, user.password)
        .then((matchPass) => {
          if (!matchPass) {
            next(new httpError("invalid password...", 401));
          } else {
            if (rememberMe) {
              token = jwt.sign(
                { mobile: user.mobile, userId: user.id },
                "mySecretKey",
                { expiresIn: "2h" }
              );
            } else {
              token = jwt.sign(
                { mobile: user.mobile, userId: user.id },
                "mySecretKey",
                { expiresIn: "1h" }
              );
            }
            user.token = token;
            return user.save();
          }
        })
        .then(() => {
          console.log("usser:", user.dataValues.mobile);
          console.log("tokkkken:", token);

          res
            .status(200)
            .json({ userMobile: user.dataValues.mobile, token: token });
        })
        .catch((err) => {
          next(new httpError(err, 500));
        });
    })
    .catch(() => {
      next(new httpError("Failed to Fetch User...", 500));
    });
};

exports.postResetPassword = (req, res, next) => {
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
  console.log("sssssssssssssssssssssssssssss");
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
      const mem = [];
      members.map((m) => {
        mem.push(m.dataValues);
      });

      res.json({ members: mem });
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
  // let stId='';

  // userStatus.findOne({where:{
  //     status_name:status
  // }})
  // .then(sId => {
  //     stId=sId.id
  // })
  // .catch(e=>console.log(e))

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
              userStatusId: status,
              userGroupId: group,
              flag: 1,
            });
          } else {
            next(new httpError("User Already Exist...", 500));
          }
        })
        .then((createdUser) => {
          // console.log('createdUUUser' , createdUser)
          return res.status(201).json({ user: createdUser });
        })
        .catch((e) => {
          next(new httpError(e, 500));
        });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

let grpId = "";
let stId = "";
exports.postUpdateMember = (req, res, next) => {
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
  } = req.body;
  console.log("boddddy", req.body);
  userGroup
    .findOne({
      where: {
        group_name: group,
      },
    })
    .then((g) => {
      console.log("gggg", g.dataValues.id);
      if (g) {
        grpId = g.dataValues.id;
      } else {
        grpId = group;
      }
    })
    .catch((e) => console.log(e));

  userStatus
    .findOne({
      where: {
        status_name: status,
      },
    })
    .then((s) => {
      console.log("sss", s.dataValues.id);
      if (s) {
        stId = s.dataValues.id;
      } else {
        stId = status;
      }
    })
    .catch((e) => console.log(e));

  console.log("boddddyggggggsssss", grpId, stId);

  User.findOne({
    where: {
      mobile: mobile,
    },
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
      // console.log('meeeeeeeeeeeem' , member)
      (member.userGroupId = grpId),
        (member.userStatusId = stId),
        (member.name = name),
        (member.lastName = lastName),
        (member.mobile = mobile),
        (member.birthDay = birthDay),
        (member.weight = weight),
        (member.height = height),
        (member.gender = gender);
      return member.save();
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
