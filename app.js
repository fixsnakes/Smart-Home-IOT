const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { mqttconnection } = require('./Config/mqttconfig.js');  // Import hàm kết nối MQTT

const app = express();
const server = http.createServer(app).listen(3000);
const io = socketio(server)

const mqttControl = mqttconnection();


const {UpdateDataSensor} = require('./service/DataSensorService.js');
const {UpdateDataDevice} = require('./service/DeviceActivityService.js');
const formatdate = require('./helper/dateHelper.js');


mqttControl.on('connect', () => {
    console.log("Connected to MQTT broker");
    mqttControl.subscribe('esp32/datasensor', (err) => {
        if(!err){
            console.log("Subcribed");
        }
    });

    // Dang Ky Topic Dieu Hoa
    mqttControl.subscribe('esp32/dieuhoaStatus', (err) => {
      if(!err){
          console.log("Subcribed");
      }
    });

    // Dang Ky Topic Den
    mqttControl.subscribe('esp32/denStatus', (err) => {
        if(!err){
            console.log("Subcribed");
        }
    });


    // Dang Ky Topic Quat
    mqttControl.subscribe('esp32/quatStatus', (err) => {
        if(!err){
            console.log("Subcribed");
        }
    });
})

mqttControl.on('error', (err) => {
    console.log(err);
})



mqttControl.on('message', (topic,message) => {


    if(topic === "esp32/datasensor"){

        const dataReceive = message.toString();

        const values = dataReceive.match(/[\d.]+/g);

        if (values) {
            const temperature = parseFloat(values[0]);
            const humidity = parseFloat(values[1]);
            let light = parseInt(values[2], 10);
            
            if(light > 700){
                light = Math.floor(parseInt(light) / 2);
            }

            

            const datenow = formatdate();
            
            

            io.emit('dataSensor', [temperature, humidity, light]);
            

            console.log([temperature,humidity,light])
            //UpdateDataSensor(temperature,humidity,light,datenow);

            
        }

    }

    if(topic === "esp32/dieuhoaStatus"){
        console.log(message.toString());
        io.emit('statusAir', message.toString());
        UpdateDataDevice("Điều hòa",message.toString(),formatdate())
    }

    console.log(topic)

    if(topic === "esp32/denStatus"){
        console.log(message.toString());

        io.emit('statusLight',message.toString());
        UpdateDataDevice("Đèn",message.toString(),formatdate())
    }


    if(topic === "esp32/quatStatus"){
        console.log(message.toString());
        io.emit('statusFan',message.toString());
        UpdateDataDevice("Quạt",message.toString(),formatdate())
    }

    

    
})



io.on('connection', (socket) => {
    socket.on('AirControl' , (command) => {

        console.log("Received AirControl");
        const topic = "esp32/dieuhoa";

        mqttControl.publish(topic,command);
    })


    socket.on('LightControl' ,(command) => {
        console.log("Received LightControl");

        const topic = "esp32/den";

        mqttControl.publish(topic,command);
    })


    socket.on('FanControl', (command) => {
        console.log("Received FanControl");

        const topic = "esp32/quat";

        mqttControl.publish(topic,command);
    })
})



app.use(express.static('public'));

app.use(express.json());



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');   

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');   


    next();
  });


// Make default site

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/iotdashboard.html');
})


const DataSensorRouter = require('./routes/DataSensorRoutes.js');
const DeviceActivityRouter = require('./routes/DeviceActivityRoutes.js');
const DataChartRouter =  require('./routes/DataChartRoute.js')



app.use('/api/getdatacharts',DataChartRouter);
app.use('/api/getdevicehistory',DeviceActivityRouter);
app.use('/api/getmeasuredata',DataSensorRouter);

