const express = require('express');
const router = express.Router();

const authCheck = require('../shared/authCheck');
const groupController = require('../controller/groupController');

router.post('/create'  , groupController.postCreate)
router.post('/delete'  , groupController.postDelete)
router.post('/update'  , groupController.postUpdate)
router.post('/list'  , groupController.postList)
router.post('/search'  , groupController.postSearch)


module.exports=router;