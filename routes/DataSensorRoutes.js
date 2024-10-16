

const {GetData,GetDataFilter} = require('../controllers/getDataSensor');

const express = require('express');



const router = express.Router();




router
    .route('/')
    .get(GetData);

router
    .route('/filter')
    .get(GetDataFilter);


module.exports = router;