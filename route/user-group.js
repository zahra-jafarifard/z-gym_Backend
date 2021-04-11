const express = require("express");
const router = express.Router();

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
router.post("/create", groupController.postCreate);
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
router.post("/delete", groupController.postDelete);
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
router.post("/update", groupController.postUpdate);
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
router.post("/list", groupController.postList);
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
router.post("/search", groupController.postSearch);

module.exports = router;
