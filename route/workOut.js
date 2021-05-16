const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");

const workOutController = require("../controller/workOutController");

router.post("/list", authCheck, workOutController.postList);
router.post("/search", authCheck, workOutController.postSearch);
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

  workOutController.postCreate
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
  workOutController.postUpdate
);

router.post("/delete", authCheck, workOutController.postDelete);
router.post("/fetchForUpdate", authCheck, workOutController.fetchForUpdate);

module.exports = router;
