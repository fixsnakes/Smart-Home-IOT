

const mysql = require('mysql2/promise');

const path = require('path');


const dotenv = require('dotenv');



dotenv.config({path: path.resolve(__dirname,'../.env')});


exports.connectionDatabase = () => {
    const connection = mysql.createPool({
        host: process.env.HOST,

        user: process.env.USER, 
        password: process.env.PASSWORD,

        database: process.env.DATABASE
    })
    
    return connection;
}





