const express = require('express');
const router = express.Router();

const authCheck = require('../shared/authCheck');
const exerciseController = require('../controller/exerciseController');

router.post('/create' ,  exerciseController.postCreate)
router.post('/delete' ,  exerciseController.postDelete)
router.post('/update' ,  exerciseController.postUpdate)
router.post('/list' ,  exerciseController.postList)
router.post('/search'  , exerciseController.postSearch)



module.exports=router;