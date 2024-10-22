

const {GetDeviceHistoryFilter} =  require('../controllers/getDeviceActivity.js');



const express = require('express');

const router = express.Router();



router
    .route('/')
    .get(GetDeviceHistoryFilter);




module.exports = router;
