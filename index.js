//DOM variables
const table = document.getElementsByTagName("table")[0];

//global variables
let gameState = false;

//functions
function makeTable() {
  for (let i = 0; i < 15; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 17; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

//function calling
makeTable();
