


const dotenv = require('dotenv');

const mqtt = require('mqtt');

const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../.env')});







exports.mqttconnection = () => { 

        const connection = mqtt.connect(`mqtt://${process.env.MQTTHOST}:${process.env.MQTTPORT}`,{
        
            username : process.env.MQTTUSERNAME,
            password : process.env.MQTTPASSWORD,
        });


        return connection;

}       

