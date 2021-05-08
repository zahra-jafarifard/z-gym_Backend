const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");

const gymTypeController = require("../controller/gymTypeController");

router.post("/list", authCheck, gymTypeController.postList);
router.post("/search", authCheck, gymTypeController.postSearch);
router.post(
  "/create",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Name"),
    
  ],
  authCheck,

  gymTypeController.postCreate
);

router.post(
  "/update",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Name"),

    
  ],
  authCheck,
  gymTypeController.postUpdate
);

router.post("/delete", authCheck, gymTypeController.postDelete);
router.post("/fetchForUpdate", authCheck, gymTypeController.fetchForUpdate);


module.exports = router;
