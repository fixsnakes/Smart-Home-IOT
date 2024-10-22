


const db = require('../Config/database.js');



const connection = db.connectionDatabase();






exports.GetDataFilter = async (req,res) => {
    try{

        const {offset,limit,Sort,SortType,value} = req.query;

        console.log(limit)
        

        let isvalue = false;

        let totaldata = 0

        console.log(value)

        let queryData = `SELECT *,DATE_FORMAT(Date_Time, '%Y-%m-%d %H:%i:%s') AS formatted_date FROM datasensor `;


        if(value != ""){
            queryData += `WHERE Date_Time LIKE '${value}%' `;
            isvalue = true;
        }

        if(Sort != ""){
            queryData += `ORDER BY ${SortType} ${Sort} `
        }

        [totaldata] = await connection.query(queryData);


        console.log(queryData)

        queryData += `LIMIT ${offset},${limit} `


     
        
        const [data] = await connection.query(queryData);

        console.log(queryData)

        res.status(200).json({
            data : data,
            totalData : totaldata.length
    
        })
       
        
    }catch(error){
        res.status(404).json({
            status: String(error)
        })
    }
}




