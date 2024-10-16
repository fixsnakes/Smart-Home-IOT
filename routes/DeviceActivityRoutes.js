

const {GetDeviceHistory,GetDeviceHistoryFilter} =  require('../controllers/getDeviceActivity.js');



const express = require('express');

const router = express.Router();



router
    .route('/')
    .get(GetDeviceHistory);

router
    .route('/filter')
    .get (GetDeviceHistoryFilter);
    


module.exports = router;
