const httpError = require("../shared/httpError");
const Group = require("../model/user-group");
const { Op } = require("sequelize");

exports.postCreate = (req, res, next) => {
  const { groupName, groupSatus } = req.body;
  if (!groupName) {
    throw new httpError("groupName Field Is Empty...", 422);
  }
  return Group.findOne({
    where: {
      group_name: groupName,
    },
  })
    .then((grpName) => {
      if (grpName) {
        throw new httpError("groupName is already exist... ", 500);
      }
      return Group.create({
        group_name: groupName,
        group_status: groupSatus,
        flag: 1,
      });
    })
    .then((createdGroup) => {
      return res
        .status(201)
        .json({
          message: `new group ${createdGroup.dataValues.group_name} created...`,
        });
    })
    .catch(() => {
      next(new httpError("Fail in Fetching groupName ... ", 500));
    });
};

exports.postDelete = (req, res, next) => {
  const { id } = req.body;
  Group.findOne({
    where: {
      id: id,
      flag: 1,
    },
  })
    .then((group) => {
      console.log("grooooup", group);
      if (!group) {
        return next(new httpError("not found group...", 404));
      } else {
        // console.log('group id db', group.id);
        group.flag = 0;
        return group.save();
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
  const id = +req.body.id + 1;
  const name = req.body.name;
  const status = req.body.status;
  console.log("reeeeq", req.body);
  Group.findOne({
    where: {
      id: id,
    },
  })
    .then((grp) => {
      console.log("gggg", grp);
      if (!grp) {
        return next(new HttpError("there is not this group...", 404));
      }
      grp.group_name = name;
      grp.group_status = status;
      return grp.save();
    })
    .then(() => {
      res.status(200).json({ message: "group  updated successfully..." });
    })
    .catch((err) => {
      // next (new httpError(err , 500));
      console.log(err);
    });
};

exports.postList = (req, res, next) => {
  Group.findAll({
    where: {
      flag: 1,
    },
    // attributes:['group_name' , 'group_status' ]
  })
    .then((groups) => {
      // console.log(groups)
      res.status(200).json({ groups: groups });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};

exports.postSearch = (req, res, next) => {
  let { name, status } = req.body;
  if (!name && !status) {
    Group.findAll()
      .then((g) => {
        res.status(200).json({ groups: g });
      })
      .catch((e) => next(new httpError(e, 500)));
  }
  if (status === "") {
    status = null;
  }
  Group.findAll({
    attributes: ["group_name", "group_status"],

    where: {
      [Op.or]: [{ group_name: name }, { group_status: status }],
    },
  })
    .then((grps) => {
      // console.log('gggg' , grps);
      res.status(200).json({ groups: grps });
    })
    .catch((e) => {
      next(new httpError(e, 500));
    });
};
