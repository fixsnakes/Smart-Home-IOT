



const DateHour = [];


const Datatemp = [];
const DataHumid = [];
const DataLight = [];


const ctx = document.getElementById('myChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

const gradientTemp = ctx.createLinearGradient(0, 0, 0, 400);
gradientTemp.addColorStop(0, 'rgba(107, 208, 152, 0.2)');
gradientTemp.addColorStop(1, 'rgba(107, 208, 152, 0)');

// Gradient cho độ ẩm
const gradientHumidity = ctx.createLinearGradient(0, 0, 0, 400);
gradientHumidity.addColorStop(0, 'rgba(239, 129, 86, 0.2)');
gradientHumidity.addColorStop(1, 'rgba(239, 129, 86, 0)');


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: DateHour, // Tháng trong năm
        datasets: [
            
        {
            label: 'Temperature (°C)',
            data: Datatemp,
            fill: true,
            backgroundColor: gradientTemp,
            borderColor: '#6BD098',
            borderWidth: 3,
            tension: 0.4, // Làm mịn đường
            pointRadius: 0 // Ẩn các điểm dữ liệu
        },

        {
            label: 'Humidity (%)',
            data: DataHumid,
            fill: true,
            backgroundColor: gradientHumidity,
            borderColor: '#EF8156',
            borderWidth: 3,
            tension: 0.4, // Làm mịn đường
            pointRadius: 0 // Ẩn các điểm dữ liệu
        },
        {
            label: 'Light (Lux)',
            data: DataLight,
            fill: true,
            backgroundColor: gradient,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3,
            tension: 0.4, // Làm mịn đường
            pointRadius: 0 // Ẩn các điểm dữ liệu
        }
    
    
    
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true // Ẩn chú thích
            },
            tooltip: {
                enabled: true // Ẩn tooltip
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // Ẩn đường lưới trục x
                },
                ticks: {
                    color: '#888', // Màu sắc của nhãn trục x
                    font: {
                        size: 14,
                        family: 'Poppins', // Phông chữ
                        weight: '500'
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)' // Màu lưới trục y
                },
                ticks: {
                    color: '#888', // Màu sắc của nhãn trục y
                    font: {
                        size: 14,
                        family: 'Poppins', // Phông chữ.
                        weight: '500'
                    }
                },
                min: 0, // Giới hạn trục y nhỏ nhất
                max: DataLight[DataLight.length - 1] // Giới hạn trục y lớn nhất
            }
        }
    }
});




async function GetDataForChart(){
    const response = await fetch("http://127.0.0.1:3000/api/getdatacharts/");
    const {data} = await response.json();

    const firstData = data[0];


    document.getElementById("numberoftemp").innerHTML = `${data[0].temp} °C`;
    document.getElementById("numberofhumid").innerHTML = `${data[0].humidity} %`;
    document.getElementById("numberoflight").innerHTML = `${data[0].lux} LUX`;


    data.forEach(items => {
        Datatemp.push(items.temp);
        DataHumid.push(items.humidity);
        DataLight.push(items.lux);
        DateHour.push(items.formatted_date);
    } )


    myChart.update();
}


GetDataForChart();



function formatdate(){
    const date = new Date();

    const getDate = date.getDate().toLocaleString().padStart(2,"0");

    const getMonth = (date.getMonth() + 1).toLocaleString().padStart(2,"0");

    const getFullYear = String(date.getFullYear())


    const getTime = date.getHours().toLocaleString().padStart(2,"0") + ":" + date.getMinutes().toLocaleString().padStart(2,"0") + ":" + date.getSeconds().toLocaleString().padStart(2,"0");

    const getFullTime = getFullYear + "-" + getMonth + "-" + getDate + " " + getTime; 


    return getFullTime;
}



const getClick = document.querySelectorAll(".listitems");


getClick.forEach((items) => {

    console.log(items.getAttribute("id"));
    if(items.getAttribute("id") ==="dashboard"){
        items.addEventListener('click',()=>{
            window.location.href = "iotdashboard.html";
        })
    }
    if(items.getAttribute("id") ==="measurementhistory"){
        items.addEventListener('click',()=>{
            window.location.href = "datasensor.html";
        })
    }
    if(items.getAttribute("id") ==="ControlDeviceHistory"){
        items.addEventListener('click',()=>{
            window.location.href = "deviceactivity.html";
        })
    }
    if(items.getAttribute("id") ==="userpage"){
        items.addEventListener('click',()=>{
            window.location.href = "profile.html";
        })
    }
})


if(document.URL  === "http://localhost:3000/iotdashboard.html"){

    const dashboard  = document.querySelector("#dashboard");

    dashboard.style.backgroundColor = "rgba(255, 255, 255, 0.24)";
}

if(localStorage.getItem('datehour') !== null){
    const DateHour = localStorage.getItem('datehout');


    const Datatemp = localStorage.getItem('datetemp');
    const DataHumid = localStorage.getItem('datehumid');
    const DataLight = localStorage.getItem('datelight');

    
}


const socket = io();

socket.on('dataSensor', (data) => {
    document.getElementById('numberoftemp').textContent = data[0] + " °C";
    document.getElementById('numberofhumid').textContent = data[1] + " %";
    document.getElementById('numberoflight').textContent = data[2] + " LUX";


    if (Datatemp.length > 4){
        Datatemp.shift();
    }
    Datatemp.push(data[0]);

    if (DataHumid.length > 4){
        DataHumid.shift();
    }
    DataHumid.push(data[1]);

    if (DataLight.length > 4){
        DataLight.shift();
    }
    DataLight.push(data[2]);

    

    const date = new Date();

    //const timeGet = date.getHours().toLocaleString().padStart(2,"0") + ":" + date.getMinutes().toLocaleString().padStart(2,"0") + ":" + date.getSeconds().toLocaleString().padStart(2,"0");


    if (DateHour.length > 4){
        DateHour.shift();
    }
    DateHour.push(formatdate());


    myChart.update();


    localStorage.setItem('datatemp',Datatemp);
    localStorage.setItem('datahumid',DataHumid);
    localStorage.setItem('datalight',DataLight);
    localStorage.setItem('datehour',DateHour);

});


socket.on('statusAir', (msg) => {

    

    if(msg){
        document.getElementById('status-air').innerHTML = `${msg}`;
    }
})


socket.on('statusLight', (msg) => {

    

    if(msg){
        document.getElementById('status-light').innerHTML = `${msg}`;
    }
})


socket.on('statusFan', (msg) => {

    

    if(msg){
        document.getElementById('status-fan').innerHTML = `${msg}`;
    }
})

// Add EventListener for each button


const OnButton = document.querySelectorAll(".button");


OnButton.forEach((item) => {
    const itemDefault = item.getAttribute("id");

    console.log(itemDefault);
    if (itemDefault === "on-air"){
        item.addEventListener('click', () => {
            socket.emit("AirControl","ON")
        })
    }

    if (itemDefault === "on-light"){
        item.addEventListener('click', () => {
            socket.emit("LightControl","ON")
        } )
    }


    if (itemDefault === "on-fan"){
        item.addEventListener('click', () => {
            socket.emit("FanControl","ON")
        } )
    }


    if (itemDefault === "off-air"){
        item.addEventListener('click', () => {
            socket.emit("AirControl","OFF")
        })
    }

    if (itemDefault === "off-light"){
        item.addEventListener('click', () => {
            socket.emit("LightControl","OFF")
        } )
    }


    if (itemDefault === "off-fan"){
        item.addEventListener('click', () => {
            socket.emit("FanControl","OFF")
        } )
    }




})


