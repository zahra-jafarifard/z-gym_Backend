const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");
const groupController = require("../controller/groupController");

/**
 * @swagger
 * /user_group/created:
 *   post:
 *     summary: created a user_group.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *                 description: The user_group's name.
 *                 example: مربی
 *               groupSatus:
 *                 type: string
 *                 description: The user_group's name.
 *                 example: 1
 *
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
  [
    body("groupName")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Group Name"),

    body("groupSatus")
      .isBoolean()
      .trim()
      .withMessage("Please Insert Valid Group Satus"),
  ],
  authCheck,
  groupController.postCreate
);
/**
 * @swagger
 * /user_group/delete:
 *   post:
 *     summary: Delete a user_group.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: integer
 *                 description: The user_group's ID.
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
router.post("/delete", authCheck, groupController.postDelete);
/**
 * @swagger
 * /user_group/update:
 *   post:
 *     summary: update a user_group.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The user_group's ID.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The user_group's name.
 *                 example: مربی
 *               status:
 *                 type: string
 *                 description: The user_group's name.
 *                 example: 0
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
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please Insert Valid Group Name"),

    // body('status')
    // .isBoolean()
    // .trim()
    // .withMessage("Please Insert Valid Group Satus")
  ],
  authCheck,
  groupController.postUpdate
);
/**
 * @swagger
 * /user_group/list:
 *   post:
 *     summary: retrive user_group
 *     responses:
 *       201:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groups:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user_group's ID.
 *                       example: 1
 *                     group_name:
 *                       type: string
 *                       description: The user_group's name.
 *                       example: مربی
 *                     group_status:
 *                       type: string
 *                       description: The user_group's status.
 *                       example: 0
 */
router.post("/list", authCheck, groupController.postList);
/**
 * @swagger
/**
 * @swagger
 * /user_group/search:
 *   post:
 *     summary: search a user_group.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user_group's ID.
 *                 example: مربی
 *               status:
 *                 type: string
 *                 description: The user_group's ID.
 *                 example: 1
 *             
 *     responses:
 *       200:
 *         description: Search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       group_name:
 *                         type: string
 *                         description: The user's name.
 *                         example: مربی
 *                       group_status:
 *                         type: string
 *                         description: The user's name.
 *                         example: 0
 *                       
 * 
 * 
*/
router.post("/search", authCheck, groupController.postSearch);
router.post("/fetchForUpdate", authCheck, groupController.fetchForUpdate);


module.exports = router;
