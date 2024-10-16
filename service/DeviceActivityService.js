


const db =  require('../Config/database.js');


const dbconnection = db.connectionDatabase();




exports.UpdateDataDevice = async (device,action,time) => {
    const query = "INSERT INTO devicehistory (thietbi,hanhdong,thoigian) VALUES(?, ?, ?)";


    await dbconnection.query(query,[device,action,time]);
}