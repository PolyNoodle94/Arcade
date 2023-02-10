//DOM variables
const table = document.getElementsByTagName("table")[0];
const preGameTitle = document.getElementById("preGameTitle");
const afterGameTitle = document.getElementById("afterGameTitle");
const powerButton = document.getElementById("power-up-button");
const score = document.getElementById("score");

//global variables
let powerUpState = false;
let gameState = false;
let appleEaten = true;
powerButton.style.color = "red";
let snake = {
  body: [
    [1, 1],
    [2, 1],
    [3, 1],
  ],
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
  cellArr[1][1].className = "snake";
  cellArr[2][1].className = "snake";
  cellArr[3][1].className = "snake";
}

function renderSnake() {
  try {
    //Saves the location of the tail of the snake
    let previousPosition = [snake.body[0][0], snake.body[0][1]];

    //Cuts off the tail of the snake and puts it at the head
    snake.body.push(snake.body.shift());

    //Set the coordinates of the new head = to that of the previous head
    snake.body[snake.body.length - 1][0] = snake.body[snake.body.length - 2][0];
    snake.body[snake.body.length - 1][1] = snake.body[snake.body.length - 2][1];

    //Set the coordinates of the new head at the appropriate coordinate depending on the moving direction
    snake.body[snake.body.length - 1][0] += snake.movingDirection[0];
    snake.body[snake.body.length - 1][1] += snake.movingDirection[1];

    //Color the cell of the new head green while coloring the old tail not green
    cellArr[snake.body[snake.body.length - 1][0]][
      snake.body[snake.body.length - 1][1]
    ].className = "snake";
    cellArr[previousPosition[0]][previousPosition[1]].className = "td";
  } catch (error) {
    afterGameTitle.style.display = "block";
    clearInterval(secondIntervalID);
  }
}

function spawnApple() {
  //Grabs one random coordinates on the game map
  let x = Math.floor(Math.random() * cellArr[0].length);
  let y = Math.floor(Math.random() * cellArr.length);
  console.log(x, y);
  if (cellArr[x][y].className != "snake") {
    cellArr[x][y].className = "apple";
  } else {
    console.log("spawn apple recurse");
    spawnApple();
  }
}

//function calling
makeTable();

//Event Listeners
powerButton.addEventListener(`click`, (evt) => {
  if (!gameState) {
    if (!powerUpState) {
      powerButton.style.color = "green";
      powerUpState = true;
    } else {
      powerButton.style.color = "red";
      powerUpState = false;
    }
  }
});

afterGameTitle.addEventListener(`click`, (evt) => {
  window.location.reload();
});

addEventListener("keydown", (evt) => {
  if (evt.key === "ArrowRight") {
    if (!gameState) {
      clearInterval(firstIntervalID);
      gameState = true;
    }
    preGameTitle.style.display = `none`;
    snake.movingDirection = [0, 1];
  }
  if (evt.key === "ArrowLeft") {
    if (!gameState) {
      clearInterval(firstIntervalID);
      gameState = true;
    }
    clearInterval(firstIntervalID);
    gameState = true;
    preGameTitle.style.display = `none`;
    snake.movingDirection = [0, -1];
  }
  if (evt.key === "ArrowDown") {
    if (!gameState) {
      clearInterval(firstIntervalID);
      gameState = true;
    }
    clearInterval(firstIntervalID);
    gameState = true;
    preGameTitle.style.display = `none`;
    snake.movingDirection = [1, 0];
  }
  if (evt.key === "ArrowUp") {
    if (!gameState) {
      clearInterval(firstIntervalID);
      gameState = true;
    }
    clearInterval(firstIntervalID);
    gameState = true;
    preGameTitle.style.display = `none`;
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
  if (gameState) {
    renderSnake();
    if (appleEaten) {
      console.log(`REACHED`);
      spawnApple();
      appleEaten = false;
    }
  }
}, 50);

// clearInterval(firstIntervalID);
