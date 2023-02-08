//DOM variables
const table = document.getElementsByTagName("table")[0];
const preGameTitle = document.getElementById("preGameTitle");
const powerButton = document.getElementById("power-up-button");

//global variables
let gameState = false;
let powerUpState = false;
powerButton.style.color = "red";
let snake = {
  tail: [],
  body: [],
  head: [],
};

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

//Event Listeners
powerButton.addEventListener(`click`, (evt) => {
  if (!powerUpState) {
    powerButton.style.color = "green";
    powerUpState = true;
  } else {
    powerButton.style.color = "red";
    powerUpState = false;
  }
});

//PreGame SetInterval: keeps blinking "Press arrow keys to start the game", and once gameStarts, clearInterval
let firstIntervalID = setInterval(function () {
  console.log(`WAAA`);
  if (!gameState) {
    if (preGameTitle.style.display === "none") {
      preGameTitle.style.display = `initial`;
    } else {
      preGameTitle.style.display = `none`;
    }
  }
}, 800);

//Start Game Interval

//Actual Game Interval

// clearInterval(firstIntervalID);
