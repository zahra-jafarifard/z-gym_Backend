const express = require('express');
const router = express.Router();

const authCheck = require('../shared/authCheck');
const categoryController = require('../controller/categoryController');

router.post('/create' ,  categoryController.postCreate)
router.post('/delete' ,  categoryController.postDelete)
router.post('/update' ,  categoryController.postUpdate)
router.post('/list' , categoryController.postList)
router.post('/search'  , categoryController.postSearch)


module.exports=router;