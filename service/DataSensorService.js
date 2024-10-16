

const db  = require('../Config/database.js');


const dbconnection = db.connectionDatabase();



exports.UpdateDataSensor = async (temp,humid,light,timeDate) => {
    const updateSensorTable = await dbconnection.query(`INSERT INTO 
        
        datasensor (temp,humidity,lux,Date_time)

        VALUES(${temp},${humid},${light},"${timeDate}")
        
        `)
}