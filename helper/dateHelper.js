
function formatdate(){
    const date = new Date();

    const getDate = date.getDate().toLocaleString().padStart(2,"0");

    const getMonth = (date.getMonth() + 1).toLocaleString().padStart(2,"0");

    const getFullYear = String(date.getFullYear())


    const getTime = date.getHours().toLocaleString().padStart(2,"0") + ":" + date.getMinutes().toLocaleString().padStart(2,"0") + ":" + date.getSeconds().toLocaleString().padStart(2,"0");

    const getFullTime = getFullYear + "-" + getMonth + "-" + getDate + " " + getTime; 


    return getFullTime;
}


module.exports = formatdate;