
let currentPage = 1;
let PageLimit = 15;
let AllPage = 1;
let sortHistory = {};




async function LoadData() {


    try{


        const offset = (currentPage - 1) * PageLimit;
        const reponse = await fetch(`http://127.0.0.1:3000/api/datasensor?offset=${offset}&limit=${PageLimit}`);
    
        const {data,TotalData} = await reponse.json();

        renderTable(data,TotalData);


    }catch(error){

    }finally{
        document.getElementById('loading').style.display = 'none';
    }


  

}


async function LoadDataSearch(searchContent){
    currentPage = 1;


    const offset = (currentPage - 1) * PageLimit;
    const reponse = await fetch(`http://127.0.0.1:3000/api/datasensor?offset=${offset}&limit=${PageLimit}`);

    const {data,TotalData} = await reponse.json();

    renderTable(data,TotalData);
}



function renderTable(datatable,TotalData){
    const tbody = document.getElementsByTagName('tbody')[0];


    const totalpage = Math.ceil(TotalData / PageLimit);

    AllPage = totalpage;

    const Pelement = document.querySelector('#pagecurrent');

    Pelement.textContent = `${currentPage}/${totalpage}`;

    
    tbody.innerHTML = '';


    datatable.forEach((row) => {

        tbody.innerHTML += `

        <tr>
            <td>${row.id}</td>
            <td>${row.doam}</td>
            <td>${row.nhietdo}</td>
            <td>${row.anhsang}</td>
            <td>${row.timedate}</td>
        </tr>
        
        
        
        `
    })

}



document.addEventListener('DOMContentLoaded',LoadData);

function SetAllDefaultSort(){
    const SortIcon = document.querySelectorAll('.sort');

    SortIcon.forEach((ele) => {
        ele.innerHTML = '▲'
    })
}

document.querySelector('#next_button').addEventListener('click', () => {
    if(currentPage < AllPage){
        currentPage++;
        let sortHistory = {};
        SetAllDefaultSort();
        LoadData();
    }
})


document.querySelector("#previous_button").addEventListener('click', () => {
    if(currentPage > 1){
        currentPage--;
        let sortHistory = {};
        SetAllDefaultSort();
        LoadData();
    }
})






async function SortTable(IndexSort){
    const Tbody = document.getElementsByTagName('tbody')[0];


    const DataRows = Array.from(Tbody.querySelectorAll('tr'));


    const SortIcon = document.querySelectorAll('.sort');

    console.log(sortHistory[IndexSort])


    if(!sortHistory[IndexSort]){
        sortHistory[IndexSort] = 'asc';
        SortIcon[IndexSort-1].innerHTML = '▼';
    }

    else if (sortHistory[IndexSort] === 'asc'){     
        sortHistory[IndexSort] = 'desc';
        SortIcon[IndexSort-1].innerHTML = '▲';
    }   

    else{
        sortHistory[IndexSort] = 'asc';
        SortIcon[IndexSort-1].innerHTML = '▼';
    }





    DataRows.sort((RowA,RowB) => {
        const a = parseInt(RowA.cells[IndexSort].innerText);
        const b = parseInt(RowB.cells[IndexSort].innerText);

        if (sortHistory[IndexSort] === 'asc'){
            return a > b ? 1 : -1;
        }else {
            return a > b ? -1 : 1;
        }
    });





    Tbody.innerHTML = '';

    DataRows.forEach((row) => Tbody.appendChild(row));
}   
