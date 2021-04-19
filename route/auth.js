const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");

const authController = require("../controller/authController");

router.post(
  "/login",
  [
    check("mobile")
      .trim()
      .notEmpty()
      .withMessage("Mobile is required...")
      // .isMobilePhone(['fa-IR'])
      // .withMessage('Please Inset Valid IR Mobile Number...')
      .isLength({ min: 4, max: 12 })
      .withMessage("Invalid Mobile Number..."),

    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required...")
      .isLength({ min: 1, max: 2 })
      .isAlphanumeric()
      .withMessage("Invalid Password..."),
  ],
  authController.postLogin
);

router.post(
  "/register",
  [
    body("name", "lastName")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Name/Last Name"),

    body("mobile")
      .trim()
      .notEmpty()
      .withMessage("Mobile is required...")
      // .isMobilePhone(['fa-IR'])
      // .withMessage('Please Inset Valid IR Mobile Number...')
      .isLength({ min: 4, max: 4 })
      .withMessage("Invalid Mobile Number"),

    body("password", "repaetPassword")
      .trim()
      .notEmpty()
      .withMessage("Password / RepaetPassword is required...")
      .isLength({ min: 1, max: 8 })
      .isAlphanumeric()
      .withMessage("Invalid Password"),

    body("gender")
      .notEmpty()
      .withMessage("Gender is required...")
      .withMessage("Invalid Gender..."),

    body("birthDay")
      .notEmpty()
      .withMessage("Gender is required...")
      .toDate()
      .withMessage("Invalid Birthday"),

    body("height", "weight")
      .notEmpty()
      .withMessage("Height / Weight is required...")
      .isNumeric()
      .withMessage("Invalid Weight / Height"),
  ],
  authController.postRegister
);

router.post(
  "/forgetPassword",
  [
    check("mobile")
      .trim()
      .notEmpty()
      .withMessage("Mobile is required...")
      // .isMobilePhone(['fa-IR'])
      // .withMessage('Please Inset Valid IR Mobile Number...')
      .isLength({ min: 4, max: 12 })
      .withMessage("Invalid Phone Number..."),
  ],
  authController.postForgetPassword
);

router.post(
  "/setNewPassword/:resetToken",
  [
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("Password is required...")
      .isLength({ min: 1, max: 8 })
      .isAlphanumeric()
      .withMessage("Invalid Password"),

    body("randomNumber")
      .trim()
      .notEmpty()
      .withMessage("randomNumber is required...")
      .isLength({ min: 5, max: 5 })
      .isNumeric()
      .withMessage("Invalid randomNumber"),
  ],
  authController.postSetNewPassword
);

router.post("/members/list", authCheck, authController.postFetchMembers);
router.post("/members/search", authCheck, authController.postSearchMembers);
router.post(
  "/members/create",
  [
    body("name", "lastName")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Name/Last Name"),

    body("mobile")
      .trim()
      .notEmpty()
      .withMessage("mobile is required...")
      // .isMobilePhone(['fa-IR'])
      // .withMessage('Please Inset Valid IR Mobile Number...')
      .isLength({ min: 4, max: 12 })
      .withMessage("Invalid Mobile Number"),

    body("password", "repaetPassword")
      .trim()
      .notEmpty()
      .withMessage("Password / RepaetPassword is required...")
      .isLength({ min: 1, max: 8 })
      .isAlphanumeric()
      .withMessage("Invalid Password"),

    body("gender")
      .notEmpty()
      .withMessage("Gender is required...")
      .withMessage("Invalid Gender..."),

    body("birthDay")
      .notEmpty()
      .withMessage("Gender is required...")
      .toDate()
      .withMessage("Invalid Birthday"),

    body("height", "weight")
      .notEmpty()
      .withMessage("Height / Weight is required...")
      .isNumeric()
      .withMessage("Invalid Weight / Height"),

    body("status", "group")
      .notEmpty()
      .withMessage("Status Group is required..."),
  ],
  authCheck,
  authController.postCreateMember
);

router.post(
  "/members/update",
  [
    body("name", "lastName")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Name/Last Name"),

    body("mobile")
      .trim()
      .notEmpty()
      .withMessage("mobile is required...")
      // .isMobilePhone(['fa-IR'])
      // .withMessage('Please Inset Valid IR Mobile Number...')
      .isLength({ min: 4, max: 12 })
      .withMessage("Invalid Mobile Number"),

    // body('password').trim().notEmpty()
    // .withMessage('Password is required...')
    // .isLength({ min:1 , max:8 }).isAlphanumeric()
    // .withMessage('Invalid Password'),

    body("gender")
      .notEmpty()
      .withMessage("Gender is required...")
      .withMessage("Invalid Gender..."),

    body("birthDay")
      .notEmpty()
      .withMessage("Gender is required...")
      .toDate()
      .withMessage("Invalid Birthday"),

    body("height", "weight")
      .notEmpty()
      .withMessage("Height / Weight is required...")
      .isNumeric()
      .withMessage("Invalid Weight / Height"),

    body("status", "group")
      .notEmpty()
      .withMessage("Status Group is required..."),
  ],
  authCheck,
  authController.postUpdateMember
);
router.post("/members/delete", authCheck, authController.postDeleteMember);
router.post("/members/:id", authController.postFetchMember);

module.exports = router;
