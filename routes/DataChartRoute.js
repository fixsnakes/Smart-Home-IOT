const {GetDataForChart} = require('../controllers/getDataCharts');


const express = require('express');

const router = express.Router();


router
    .route('/')
    .get(GetDataForChart)



module.exports = router