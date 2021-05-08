const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");

const workOutDetailsController = require("../controller/workOutDetailsController");

router.post("/list", authCheck, workOutDetailsController.postList);
router.post("/search", authCheck, workOutDetailsController.postSearch);
router.post(
  "/create",
  [
    body("reps")
      .isNumeric()
      .trim()
      .withMessage("Please Insert Valid reps"),
  ],
  authCheck,

  workOutDetailsController.postCreate
);

router.post(
  "/update",
  [
    body("reps")
    .isNumeric()
    .trim()
    .withMessage("Please Insert Valid reps"),
  ],
  authCheck,
  workOutDetailsController.postUpdate
);

router.post("/delete", authCheck, workOutDetailsController.postDelete);
router.post("/fetchForUpdate", authCheck, workOutDetailsController.fetchForUpdate);

module.exports = router;
