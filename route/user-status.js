const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authCheck = require("../shared/authCheck");
const statusController = require("../controller/statusController");

/**
 * @swagger
 * /user_status/created:
 *   post:
 *     summary: created a user_status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusName:
 *                 type: string
 *                 description: The user_status's name.
 *                 example: فعال
 *
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
router.post("/create", 
[
    body('statusName')
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please Insert Valid Status Name"),

]
,
authCheck, statusController.postCreate);
/**
 * @swagger
 * /user_status/delete:
 *   post:
 *     summary: Delete a user_status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusId:
 *                 type: integer
 *                 description: The user_status's ID.
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
router.post("/delete", authCheck, statusController.postDelete);
/**
 * @swagger
 * /user_status/update:
 *   post:
 *     summary: update a user_status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The user_status's ID.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The user_status's name.
 *                 example: فعال
 *
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
router.post("/update",
[
    body('name')
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please Insert Valid Status Name"),

]
,
authCheck, statusController.postUpdate);
/**
 * @swagger
 * /user_status/list:
 *   post:
 *     summary: retrive user_status
 *     responses:
 *       201:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statuses:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user_status's ID.
 *                       example: 1
 *                     status_name:
 *                       type: string
 *                       description: The user_status's name.
 *                       example: فعال
 *
 */
router.post("/list", authCheck, statusController.postList);
/**
 * @swagger
 * /user_status/search:
 *   post:
 *     summary: search a user_status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user_status's name.
 *                 example: فعال
 *
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
 *                       status_name:
 *                         type: string
 *                         description: The status's name.
 *                         example: فعال
 *
 *
 *
 *
 */
router.post("/search", authCheck, statusController.postSearch);
router.post("/fetchForUpdate", authCheck, statusController.fetchForUpdate);

module.exports = router;
