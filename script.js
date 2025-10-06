//Ziskani informaci z configu
function getStationsInfo() {
    return new Promise(resolve => {
        const request = new XMLHttpRequest();
        request.open("GET", "stations.json");
        request.send();
        request.onload = () => {
            const stationsInfo = JSON.parse(request.responseText);
            resolve(stationsInfo);
        }
    });
}

//Vytvoreni seznamu stanic
async function createStationsList() {
    let stationsInfo = await getStationsInfo();
    const stationsList = document.getElementById("stationsList");
    stationsList.innerHTML = '';
    for(let i = 0; i < stationsInfo.length; i++) {
        const station = document.createElement("option");
        station.value = i + 1;
        station.textContent = stationsInfo[i].name;
        stationsList.appendChild(station);
    }
}

//Spusteni aplikace
async function initApp() {
    const currentStation = document.getElementById("stationsList").value;
    const grid = document.getElementById("grid");

    let stationsInfo = await getStationsInfo();
    //console.log(stationsInfo);
    let currentStationNum = parseInt(currentStation)-1;

    //Ulozeni udaju soucasne stanice do promennych
    document.getElementById("stationName").innerHTML = stationsInfo[currentStationNum].name;
    let gridX = stationsInfo[currentStationNum].gridX;
    let gridY = stationsInfo[currentStationNum].gridY;
    let panelLayout = stationsInfo[currentStationNum].panelLayout;

    //Vytvoreni layoutu
    grid.setAttribute('style', `grid-template-columns: repeat(${gridX}, 1fr); grid-template-rows: repeat(${gridY}, 1fr);`);

    grid.innerHTML = '';
    for(let i = 0; i < gridY; i++) {
        for(let j = 0; j < gridX; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            grid.appendChild(cell);
        }
    }

    const cellsArray = new Array(gridX*gridY).fill(0);
    const cells = document.querySelectorAll(".cell");

    for(let i = 0; i < panelLayout.length; i++) {
        switch(panelLayout.charAt(i)){
            case "a":
                cellsArray[i] = "blocks/a.png";
                break;
            case "b":
                cellsArray[i] = "blocks/b.png";
                break;
            case "c":
                cellsArray[i] = "blocks/c.png";
                break;
            case "d":
                cellsArray[i] = "blocks/d.png";
                break;
            case "e":
                cellsArray[i] = "blocks/e.png";
                break;
            case "f":
                cellsArray[i] = "blocks/f.png";
                break;
            case "g":
                cellsArray[i] = "blocks/g.png";
                break;
            case "h":
                cellsArray[i] = "blocks/h.png";
                break;
            case "i":
                cellsArray[i] = "blocks/i.png";
                break;
            case "j":
                cellsArray[i] = "blocks/j.png";
                break;
            case "k":
                cellsArray[i] = "blocks/k.png";
                break;
            case "l":
                cellsArray[i] = "blocks/l.png";
                break;
            case "x":
                cellsArray[i] = "blocks/x.png";
                break;
        }
    }


    //console.log(cells);
    cellsArray.forEach((value, index) => {
        cells[index].setAttribute("style", `background-image:url('${value}');background-size:cover;`)
        //cells[index].textContent = value || "Chyba načtení bloku";
    });

    //Vytvoreni funkcnich bloku
    for(let i = 0; i < cellsArray.length; i++) {
        if(cellsArray[i].includes("blocks/g.png") || cellsArray[i].includes("blocks/h.png") ||
            cellsArray[i].includes("blocks/i.png") || cellsArray[i].includes("blocks/j.png") ||
            cellsArray[i].includes("blocks/k.png") || cellsArray[i].includes("blocks/l.png")) {
            cells[i].setAttribute("onclick", `changeState(${i})`);
        }
    }
}

function changeState(index) {
    const cellsArray = document.querySelectorAll(".cell");
    const stationId = document.getElementById("stationsList").value;
    let state = 0;
    document.getElementById("address").innerHTML = "Adresa vyhybky: " + index + "<br>ID stanice: " + stationId;
    if (cellsArray[index].style.backgroundImage.includes("blocks/g.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/m.png')";
        state = 1;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/h.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/n.png')";
        state = 1;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/i.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/o.png')";
        state = 1;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/j.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/p.png')";
        state = 1;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/k.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/q.png')";
        state = 1;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/l.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/r.png')";
        state = 1;
    }

    else if (cellsArray[index].style.backgroundImage.includes("blocks/m.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/g.png')";
        state = 0;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/n.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/h.png')";
        state = 0;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/o.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/i.png')";
        state = 0;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/p.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/j.png')";
        state = 0;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/q.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/k.png')";
        state = 0;
    }
    else if (cellsArray[index].style.backgroundImage.includes("blocks/r.png")) {
        cellsArray[index].style.backgroundImage = "url('blocks/l.png')";
        state = 0;
    }
    sendData(stationId, index, state);
}

function sendData(stationIDin, switchIDin, statein) {
    fetch('https://address:5995', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stationID: stationIDin,
            switchID: switchIDin,
            state: statein
        })
    })
    .then(response => response.json())
    .then(data => console.log('Server response: ', data))
    .catch(error => console.error('Error: ', error));
}

createStationsList();