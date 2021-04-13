const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");

const authCheck = require("../shared/authCheck");

const authController = require("../controller/authController");

router.post("/login", authController.postLogin);
router.post("/register", authController.postRegister);
router.post("/resetPassword", authController.postResetPassword);
router.post(
  "/setNewPassword/:resetToken",
  authController.postSetNewPassword
);

router.post("/members/list", authController.postFetchMembers);
router.post("/members/search", authCheck, authController.postSearchMembers);
router.post("/members/create", authCheck, authController.postCreateMember);
router.post("/members/update", authCheck, authController.postUpdateMember);
router.post("/members/delete", authCheck, authController.postDeleteMember);
router.post("/members/:id", authController.postFetchMember);

module.exports = router;
