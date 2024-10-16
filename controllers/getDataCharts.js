


const db = require('../Config/database.js')

const connections = db.connectionDatabase();




exports.GetDataForChart = async (req,res) => {



    try{


        const query = `SELECT *, DATE_FORMAT(Date_Time, '%Y-%m-%d %H:%i:%s') as formatted_date FROM datasensor ORDER BY id DESC LIMIT 4`;


        const [result] = await connections.query(query);


        res.status(200).json({
            data: result
        })
    }catch(err){
        res.status(404).json("NOT FOUND")
    }
    
}


