const express = require('express');
const router = express.Router();

const authCheck = require('../shared/authCheck');
const exerciseController = require('../controller/exerciseController');
const fileUpload = require('../shared/fileUpload');

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
router.post('/create' , fileUpload.single('image') ,  exerciseController.postCreate);
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
router.post('/delete' ,  exerciseController.postDelete);
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
router.post('/update' , fileUpload.single('image') ,  exerciseController.postUpdate);
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
router.post('/list' ,  exerciseController.postList);
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
 *                       descriptipn:
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
router.post('/search'  , exerciseController.postSearch)



module.exports=router;