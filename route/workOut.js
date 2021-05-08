const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");

const gymController = require("../controller/gymController");

router.post("/list", authCheck, gymController.postList);
router.post("/search", authCheck, gymController.postSearch);
router.post(
  "/create",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Name"),

    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("phoneNumber is required..."),
    // .isLength({ min: 4, max: 12 })
    // .withMessage("Invalid phoneNumber ")

    body("gender")
      .notEmpty()
      .withMessage("Gender is required..."),

    body("status")
    .notEmpty()
    .withMessage("Gender is required..."),

    body("address")
      .notEmpty()
      .withMessage("address is required...")
      .isString()
      .withMessage("Invalid address"),
  ],
  authCheck,

  gymController.postCreate
);

router.post(
  "/update",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Name"),

    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("phoneNumber is required..."),
    // .isLength({ min: 4, max: 12 })
    // .withMessage("Invalid phoneNumber ")

    body("gender")
      .notEmpty()
      .withMessage("Gender is required..."),

    body("status")
    .notEmpty()
    .withMessage("Gender is required..."),

    body("address")
      .notEmpty()
      .withMessage("address is required...")
      .isString()
      .withMessage("Invalid address"),
  ],
  authCheck,
  gymController.postUpdate
);

router.post("/delete", authCheck, gymController.postDelete);
router.post("/fetchForUpdate", authCheck, gymController.fetchForUpdate);

module.exports = router;
