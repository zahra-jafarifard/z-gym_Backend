const express = require('express');
const router = express.Router();

const authCheck = require('../shared/authCheck');
const statusController = require('../controller/statusController');

router.post('/create'  , statusController.postCreate)
router.post('/delete'  , statusController.postDelete)
router.post('/update'  , statusController.postUpdate)
router.post('/list'  , statusController.postList)
router.post('/search'  , statusController.postSearch)


module.exports=router;