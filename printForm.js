const params = new URLSearchParams(window.location.search)
for (const [key, value] of params) { let id = value; }

//Show animation 
for (let i = 1; i < 4; i++) {
    document.getElementById(`mainSection${1}`).style.display = "none";
}

for (let i = 1; i = 6; i++) {
    document.getElementById(`date${i}`).style.display = 'none'
    document.getElementById(`time${i}`).style.display = 'none'
    document.getElementById(`total${i}`).style.display = 'none'
    document.getElementById(`services${i}`).style.display = 'none'
}

//fetch data
const url = 'https://pffm.azurewebsites.net/getForms'
const query = {
    form: 'familyTrainingMeeting',
    itemId: id 
}
const header = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
}

fetch(url, {
    method: "GET",
    headers: header,
    body: JSON.stringify(query)
})
    .then(response => response.json())
    .then(data => populatePage(data))
    .catch(console.error)

async function populatePage(data) {
    document.getElementById('staffName').innerHTML = data.staffName;
    document.getElementById('clientName').innerHTML = data.clientName;
    document.getElementById('date').innerHTML = `${data.month}/${data.day}/${data.year}`;
    
//populate using arrays
    let total = 0
    for (let i = 0; i < 6; i++) {
        document.getElementById(`date${i}`).innerHTML = data.timesheet[i].date;
        document.getElementById(`time${i}`).innerHTML = `${data.timesheet[i].timeIn} - ${data.timesheet[i].timeOut}`;
        document.getElementById(`total${i}`).innerHTML = data.timesheet[i].total;
        document.getElementById(`service${i}`).innerHTML = getService(data.timesheet[i]);
        total = total + parseInt(`total${i}`)
        if(!data.timesheet[i+1]) {i=6}
    }
    document.getElementById('totalHours').innerHTML = total.toString();
    showPage()
}

function getService(service) {
    let services = ''
    if (service.PD) { services.concat('PD, ') }
    if (service.FT) { services.concat('FT ,') }
    if (service.supervision) { services.concat('Supervision') }
    else { services.concat('none') }
    return services
}


function showPage() {
    document.getElementById('loadingAnimationSection').style.display = "none";
    for (let i = 1; i < 4; i++) {
       document.getElementById(`mainSection${1}`).style.display = "block";
    }
}

let printToPDF = document.getElementById('printToPDF')
printToPDF.addEventListener('click', (e) = {})

let exit = document.getElementById('exit') 
exit.addEventListener('click', (e) => {
    history.back()
})

//send notices to 3