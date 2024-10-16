



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

if(document.URL  === "http://localhost:3000/profile.html"){

    const dashboard  = document.querySelector("#userpage");

    dashboard.style.backgroundColor = "rgba(255, 255, 255, 0.24)";
}