const express = require("express");
const router = express.Router();
const { check , body } = require("express-validator");

const authCheck = require("../shared/authCheck");
const categoryController = require("../controller/categoryController");
/**
 * @swagger
 * /category/created:
 *   post:
 *     summary: created an category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: The category's name.
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
    body('categoryName').isString().trim().isLength({min:2})
  .withMessage('Please Insert Valid Category Name'),
]
,authCheck, categoryController.postCreate);
/**
 * @swagger
 * /category/delete:
 *   post:
 *     summary: Delete an category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: The category's ID.
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
router.post("/delete", authCheck, categoryController.postDelete);
/**
 * @swagger
 * /category/update:
 *   post:
 *     summary: update an category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The category's ID.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The category's name.
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
    body('name').isString().trim().isLength({min:2})
  .withMessage('Please Insert Valid Category Name'),
]
, authCheck, categoryController.postUpdate);
/**
 * @swagger
 * /category/list:
 *   post:
 *     summary: update an category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                       id:
 *                         type: string
 *                         description: The category's name.
 *                         example: 1
 *                       category_name:
 *                         type: string
 *                         description: The category's name.
 *                         example:  شکم
 *
 *
 *
 *
 */
router.post("/list", authCheck, categoryController.postList);
/**
 * @swagger
/**
 * @swagger
 * /category/search:
 *   post:
 *     summary: search an category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The category's ID.
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
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category_name:
 *                         type: string
 *                         description: The user's name.
 *                         example: شکم
 *                       
 * 
 * 
*/
router.post("/search", authCheck, categoryController.postSearch);

module.exports = router;
