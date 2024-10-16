



let pageLimit = 15;
let currentPage = 1;
let totalPagination = 0;

let sortHistory = {};

let isSearching = false;



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


if(document.URL  === "http://localhost:3000/deviceactivity.html"){

    const dashboard  = document.querySelector("#ControlDeviceHistory");

    dashboard.style.backgroundColor = "rgba(255, 255, 255, 0.24)";
}


const CancelButton = document.querySelector('#cancelSearch');
flatpickr("#datefrom",{});

flatpickr("#dateto",{});



async function LoadData(){

    try
    {


        const offset = (currentPage - 1)*pageLimit;
        

        const repsonse = await fetch(`http://127.0.0.1:3000/api/getdevicehistory?offset=${offset}&limit=${pageLimit}`)

        const {data,totalData} = await repsonse.json();

        rendertable(data,totalData);

    }catch(err){
        console.log(err);
    }
    
}


async function LoadDataFilter() {

    isSearching = true;
    const offset = (currentPage - 1)*pageLimit;

    const device = document.getElementById('deviceoptions').value;
    const action = document.getElementById('actionoption').value;
    const sort = document.getElementById('sortoption').value;
    const value = document.getElementById('searchdata').value;


    

    console.log(action);



    const response = await fetch(`http://127.0.0.1:3000/api/getdevicehistory/filter?offset=${offset}&limit=${pageLimit}&device=${device}&action=${action}&sort=${sort}&value=${value}`)

    const {data,totalData} = await response.json();

    rendertable(data,totalData);
}



function rendertable(data,totaldata){
    const tbody = document.getElementsByTagName('tbody')[0];


    const totalpage = Math.ceil(totaldata / pageLimit);

    totalPagination = totalpage;

    tbody.innerHTML = '';


    const pelement = document.querySelector('#pagecurrent');

    pelement.textContent = `${currentPage} of ${totalpage}`;


    data.forEach((row) => {
        tbody.innerHTML += `
         <tr>
            <td>${row.id}</td>
            <td>${row.thietbi}</td>
            <td>${row.hanhdong}</td>
            <td>${row.formatted_date}</td>
        </tr>`
    })




}





document.addEventListener('DOMContentLoaded',LoadData);




document.querySelector('#previous_button').addEventListener('click',() => {
    if(currentPage > 1){
        
        currentPage--;
        isSearching ? LoadDataFilter() : LoadData();
    }
})


document.querySelector('#next_button').addEventListener('click', () => {
    if(currentPage < totalPagination){
        currentPage++;

        isSearching ? LoadDataFilter() : LoadData();
    }
})



document.querySelector('#searchDate').addEventListener('click',() => {
    CancelButton.style.display = 'block';
    
    currentPage = 1;
    LoadDataFilter();
});


document.querySelector('#cancelSearch').addEventListener('click', ()=> {
    isSearching = false;
    CancelButton.style.display = 'none';
    document.querySelector('#deviceoptions').value = '';
    document.querySelector('#actionoption').value = '';
    document.querySelector('#sortoption').value = '';
    currentPage = 1;
    LoadData()
})




document.querySelector('#customSelect').addEventListener('change',() => {
    const selectBox = document.querySelector('#customSelect');
    pageLimit = selectBox.value;
    currentPage = 1;
    isSearching ? LoadDataFilter() : LoadData();
})
