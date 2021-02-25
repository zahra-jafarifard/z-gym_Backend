const express = require('express');
const router = express.Router();

const authCheck = require('../shared/authCheck');
const equipmentController = require('../controller/equipmentController');

router.post('/create' , equipmentController.postCreate)
router.post('/delete' ,  equipmentController.postDelete)
router.post('/update' ,  equipmentController.postUpdate)
router.post('/list' ,  equipmentController.postList)
router.post('/search' ,  equipmentController.postSearch)


module.exports=router;