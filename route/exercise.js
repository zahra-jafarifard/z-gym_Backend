const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");
const exerciseController = require("../controller/exerciseController");
const fileUpload = require("../shared/fileUpload");
/**
 * @swagger
 * /exercise/created:
 *   post:
 *     summary: created an exercise.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The exercise's ID.
 *                 example: اسکوات
 *               description:
 *                 type: string
 *                 description: The exercise's description.
 *                 example: برای بزرگ کردن باسن
 *               icon:
 *                 type: string
 *                 description: The exercise's icon.
 *                 example: null
 *               category:
 *                 type: string
 *                 description: The exercise's category.
 *                 example: ران
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 */
router.post(
  "/create",
  // [
  //   body("name")
  //     .isString()
  //     .trim()
  //     .isLength({ min: 2 })
  //     .withMessage("Please Insert Valid Exercise Name"),

  //   body("description")
  //     .isString()
  //     .trim()
  //     .isLength({ min: 5 })
  //     .withMessage("Please Insert Valid Description"),

  //   body("category")
  //     .isString()
  //     .trim()
  //     .isLength({ min: 2 })
  //     .withMessage("Please Insert Valid Category Name"),
  // ],
  authCheck,
  fileUpload.single("image"),
  exerciseController.postCreate
);
/**
 * @swagger
 * /exercise/delete:
 *   post:
 *     summary: Delete an exercise.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The exercise's ID.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Delete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 */
router.post("/delete", authCheck, exerciseController.postDelete);
/**
 * @swagger
 * /exercise/update:
 *   post:
 *     summary: update an exercise.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The exercise's ID.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The exercise's name.
 *                 example: اسکوات
 *               icon:
 *                 type: string
 *                 description: The exercise's icon.
 *                 example: null
 *               category:
 *                 type: string
 *                 description: The exercise's category.
 *                 example: ران
 *
 *     responses:
 *       200:
 *         description: Update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 */
router.post(
  "/update",
  // [
  //   check("name")
  //     .notEmpty()
  //     .isLength({ min: 2 })
  //     .withMessage("Please Insert Valid Exercise Name"),

  //   check("description")
  //     .notEmpty()
  //     .isLength({ min: 5 })
  //     .withMessage("Please Insert Valid Description"),

  //   check("category")
  //     .notEmpty()
  //     .withMessage("Please Insert Valid Category Name"),
  // ],
  authCheck,
  fileUpload.single("image"),
  exerciseController.postUpdate
);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 */
router.post("/list", authCheck, exerciseController.postList);
/**
 * @swagger
 * /exercise/search:
 *   post:
 *     summary: search an exercise.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The exercise's ID.
 *                 example: اسکوات
 *               description:
 *                 type: string
 *                 description: The exercise's description.
 *                 example: برای بزرگ کردن باسن
 *               icon:
 *                 type: string
 *                 description: The exercise's icon.
 *                 example: null
 *               category:
 *                 type: string
 *                 description: The exercise's category.
 *                 example: ران
 *     responses:
 *       200:
 *         description: Search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exercises:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: اسکوات
 *                       description:
 *                         type: integer
 *                         description: The user ID.
 *                         example: برای بزرگ کردن باسن
 *                       icon:
 *                         type: integer
 *                         description: The user ID.
 *                         example: null
 *
 *
 */
router.post(
  "/search",
  authCheck,
  exerciseController.postSearch
);
router.post("/fetchForUpdate", authCheck, exerciseController.fetchForUpdate);

module.exports = router;
