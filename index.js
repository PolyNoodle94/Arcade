//DOM variables
const table = document.getElementsByTagName("table")[0];
const preGameTitle = document.getElementById("preGameTitle");
const powerButton = document.getElementById("power-up-button");

//global variables
let powerUpState = false;
powerButton.style.color = "red";
let snake = {
  body: [[1, 1]],
  movingDirection: [0, 0],
};
let cellArr = [];

//functions
function makeTable() {
  for (let i = 0; i < 15; i++) {
    const tr = document.createElement("tr");
    cellArr.push([]);
    for (let j = 0; j < 17; j++) {
      const td = document.createElement("td");
      cellArr[i].push(td);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  cellArr[1][1].style.backgroundColor = "green";
}

function renderSnake() {
  for (let i = 0; i < snake.body.length; i++) {
    cellArr[snake.body[i][0]][snake.body[i][1]].style.backgroundColor = "green";
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

addEventListener("keydown", (evt) => {
  clearInterval(firstIntervalID);
  preGameTitle.style.display = `none`;
  if (evt.key === "ArrowRight") {
    snake.movingDirection = [0, 1];
  }
  if (evt.key === "ArrowLeft") {
    snake.movingDirection = [0, -1];
  }
  if (evt.key === "ArrowDown") {
    snake.movingDirection = [1, 0];
  }
  if (evt.key === "ArrowUp") {
    snake.movingDirection = [-1, 0];
  }
});

//PreGame SetInterval: keeps blinking "Press arrow keys to start the game", and once gameStarts, clearInterval
let firstIntervalID = setInterval(function () {
  if (preGameTitle.style.display === "none") {
    preGameTitle.style.display = `initial`;
  } else {
    preGameTitle.style.display = `none`;
  }
}, 1000);

//Actual Game Interval
let secondIntervalID = setInterval(function () {
  //LISTEN TO KEY DOWN PRESS
  snake.body[0][0] += snake.movingDirection[0];
  snake.body[0][1] += snake.movingDirection[1];
  renderSnake();
}, 300);

// clearInterval(firstIntervalID);
