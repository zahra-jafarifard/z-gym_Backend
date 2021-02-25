const express = require('express');
const router = express.Router();

const authCheck = require('../shared/authCheck');
const muscleController = require('../controller/muscleController');

router.post('/create' ,  muscleController.postCreate)
router.post('/delete' ,  muscleController.postDelete)
router.post('/update' ,  muscleController.postUpdate)
router.post('/list' ,  muscleController.postList)
router.post('/search' ,  muscleController.postSearch)



module.exports=router;