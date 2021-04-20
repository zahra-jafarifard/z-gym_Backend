const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
 
const authCheck = require("../shared/authCheck");
const muscleController = require("../controller/muscleController");

/**
 * @swagger
 * /muscle/created:
 *   post:
 *     summary: created a muscle.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               muscleName:
 *                 type: string
 *                 description: The muscle's name.
 *                 example: سینه
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
    body("muscleName")
    .isString()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Please Insert Valid Muscle Name")
]
,authCheck, muscleController.postCreate);
/**
 * @swagger
 * /muscle/delete:
 *   post:
 *     summary: Delete a muscle.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               muscleId:
 *                 type: integer
 *                 description: The muscle's ID.
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
router.post("/delete", authCheck, muscleController.postDelete);
/**
 * @swagger
 * /muscle/update:
 *   post:
 *     summary: update a muscle.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The muscle's ID.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The muscle's name.
 *                 example: شکم
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
    body("name")
    .isString()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Please Insert Valid Muscle Name")
]
,authCheck, muscleController.postUpdate);
/**
 * @swagger
 * /muscle/list:
 *   post:
 *     summary: retrive muscles
 *     responses:
 *       201:
 *         description: List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 muscles:
 *                   type: object
 *                   properties:
 *                     muscle_name:
 *                       type: string
 *                       description: The Muscle's name.
 *                       example: شکم
 */
router.post("/list", authCheck, muscleController.postList);
/**
 * @swagger
/**
 * @swagger
 * /muscle/search:
 *   post:
 *     summary: search a muscle.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The muscle's ID.
 *                 example: شکم
 *             
 *     responses:
 *       200:
 *         description: Search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 muscle:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       muscle_name:
 *                         type: string
 *                         description: The user's name.
 *                         example: شکم
 *                       
 * 
 * 
*/
router.post("/search", authCheck, muscleController.postSearch);
router.post("/fetchForUpdate", authCheck, muscleController.fetchForUpdate);

module.exports = router;
