const express = require("express");
const router = express.Router();
const { check , body } = require("express-validator");

const authCheck = require("../shared/authCheck");
const equipmentController = require("../controller/equipmentController");
/**
 * @swagger
 * /equipment/create:
 *   post:
 *     summary: Create an Equipment.
 *     responses:
 *       200:
 *         description: Create
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/create",
[
    body('equipmentName').isString().trim().isLength({min:2})
  .withMessage('Please Insert Valid Equipment Name'),
]
, authCheck, equipmentController.postCreate);
/**
 * @swagger
 * /equipment/delete:
 *   post:
 *     summary: Delete an Equipment.
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
 */
router.post("/delete", authCheck, equipmentController.postDelete);
/**
 * @swagger
 * /equipment/update:
 *   post:
 *     summary: Update an Equipment.
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
 */
router.post("/update",
[
    body('name').isString().trim().isLength({min:2})
  .withMessage('Please Insert Valid Equipment Name'),
]
, authCheck, equipmentController.postUpdate);
/**
 * @swagger
 * /equipment/list:
 *   post:
 *     summary: Retrive Equipment's list
 *     responses:
 *       200:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 equipment:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       equipment_name:
 *                         type: string
 *                         description: The equipment's name.
 *                         example: دمبل
 */
router.post("/list", authCheck, equipmentController.postList);
/**
 * @swagger
 * /equipment/search:
 *   post:
 *     summary: Do Search on equipment table
 *     responses:
 *       200:
 *         description: Search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 equipment:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       equipment_name:
 *                         type: string
 *                         description: The equipment's name.
 *                         example: دمبل
 */
router.post("/search", authCheck, equipmentController.postSearch);
router.post("/fetchForUpdate", authCheck, equipmentController.fetchForUpdate);


module.exports = router;
