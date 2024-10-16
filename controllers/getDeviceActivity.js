
const db = require('../Config/database.js');




const connection = db.connectionDatabase();


exports.GetDeviceHistory = async (req,res) => {
    try{
        const {offset,limit} = req.query;

        const [data] = await connection.query(`SELECT *, DATE_FORMAT(thoigian, '%Y-%m-%d %H:%i:%s') AS formatted_date FROM devicehistory LIMIT ${offset},${limit}`);

        const [totalPage] = await connection.query(`SELECT COUNT(*) FROM devicehistory `);


        res.status(200).json({
            data : data,
            totalData : totalPage[0]['COUNT(*)']
        })
        
    }catch(err){
        console.log(err);
    }
}


exports.GetDeviceHistoryFilter = async (req,res) =>{
    try{
        

        const {offset,limit,device,action,sort,value} = req.query;

        let queryData = `SELECT *, DATE_FORMAT(thoigian, '%Y-%m-%d %H:%i:%s') AS formatted_date FROM devicehistory WHERE 1=1`;

        if(device != ""){
            queryData += ` AND thietbi = '${device}'`;
        }

        if(action != ""){
            queryData += ` AND hanhdong = '${action}'`;
        } 

        if(value != ""){
            queryData += ` AND thoigian LIKE '${value}%'`;
        }

        if(sort != ""){
            queryData += ` ORDER BY thoigian ${sort}`;
        }

        const [totalData] = await connection.query(queryData);


        queryData += ` LIMIT ${offset},${limit} `

        const [data] = await connection.query(queryData);

        res.status(200).json({
            data : data,
            totalData : totalData.length
        })
        
    }catch(err){
        console.log(err);
    }
}