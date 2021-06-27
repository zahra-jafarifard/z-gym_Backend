const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");

const daysOfWeekController = require("../controller/daysOfWeekController");

router.post("/list", authCheck, daysOfWeekController.postList);
router.post("/fetchForUpdate", authCheck, daysOfWeekController.fetchForUpdate);


// router.post("/search", authCheck, daysOfWeekController.postSearch);
// router.post(
//   "/create",
//   [
//     body("name")
//       .isString()
//       .trim()
//       .isLength({ min: 3 })
//       .withMessage("Please Insert Valid Name"),
    
//   ],
//   authCheck,

//   daysOfWeekController.postCreate
// );

// router.post(
//   "/update",
//   [
//     body("name")
//       .isString()
//       .trim()
//       .isLength({ min: 3 })
//       .withMessage("Please Insert Valid Name"),

    
//   ],
//   authCheck,
//   daysOfWeekController.postUpdate
// );

// router.post("/delete", authCheck, daysOfWeekController.postDelete);



module.exports = router;
