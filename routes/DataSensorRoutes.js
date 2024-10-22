

const {GetDataFilter} = require('../controllers/getDataSensor');

const express = require('express');



const router = express.Router();




router
    .route('/')
    .get(GetDataFilter);



module.exports = router;