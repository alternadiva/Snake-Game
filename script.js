/* Draw canvas */

const board = document.getElementById("game-board");

const displayScore = document.getElementById("score");
const bestScore = document.getElementById("best-score");

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const widthCanvas = 400;
const heightCanvas = 400;

const widthRect = 20;
const heightRect = 20;

let rectangle = [];

rectangle[0] = {
  x: Math.floor(widthCanvas / 2),
  y: Math.floor(heightCanvas / 2),
  width: widthRect,
  height: heightRect,
};

rectangle[1] = rectangle[0];
rectangle[2] = rectangle[0];

let direction;

// Add key event listener

window.addEventListener("keydown", keyDown);

// Set the direction and avoid turning opposite direction
function keyDown({ which }) {
  if (which === 37 && direction !== "right") {
    direction = "left";
  } else if (which === 39 && direction !== "left") {
    direction = "right";
  } else if (which === 38 && direction !== "down") {
    direction = "up";
  } else if (which === 40 && direction !== "up") {
    direction = "down";
  }
}

/* Place target randomly */

// Randomize target location
let target = {
  x: Math.floor(Math.random() * (widthCanvas / widthRect)) * widthRect,
  y: Math.floor(Math.random() * (heightCanvas / heightRect)) * heightRect,
};

window.addEventListener("load", drawCanvas);

function drawCanvas() {
  canvas.setAttribute("width", widthCanvas);
  canvas.setAttribute("height", heightCanvas);

  canvas.style.backgroundColor = "rgb(210, 241, 191)";
  canvas.style.border = "10px solid rgb(131, 103, 67)";
  canvas.style.borderRadius = "20px";

  //grow tail
  for (let i = 0; i < rectangle.length; i++) {
    drawRect(i);
    if (rectangle[i].x == target.x && rectangle[i].y == target.y) {
      target = {
        x: Math.floor(Math.random() * (widthCanvas / widthRect)) * widthRect,
        y: Math.floor(Math.random() * (heightCanvas / heightRect)) * heightRect,
      };
    }
  }

  //move head
  let frontX = rectangle[0].x;
  let frontY = rectangle[0].y;

  if (direction === "left") {
    frontX -= widthRect;
  } else if (direction === "right") {
    frontX += widthRect;
  } else if (direction === "up") {
    frontY -= heightRect;
  } else if (direction === "down") {
    frontY += heightRect;
  }

  if (frontX == target.x && frontY == target.y) {
    score += 1;
    displayScore.innerText = score;

    target = {
      x: Math.floor(Math.random() * (widthCanvas / widthRect)) * widthRect,
      y: Math.floor(Math.random() * (heightCanvas / heightRect)) * heightRect,
    };
  } else {
    rectangle.pop();
  }

  let newFront = {
    x: frontX,
    y: frontY,
  };

  // collision

  rectangle.unshift(newFront);
  drawTarget();

  //game over
  if (
    frontX < 0 ||
    frontY < 0 ||
    frontX > widthCanvas - 20 ||
    frontY > heightCanvas - 20 ||
    collision(newFront, rectangle)
  ) {
    saveScore(score);
    clearInterval(update);
    overlay.style.display = "flex";
    startBtn.innerText = "RESTART";
  }

  //scorePoints();

  board.appendChild(canvas);
}

/* Move object */

function drawRect(index) {
  context.fillStyle = "rgb(69, 175, 7)";
  context.fillRect(
    //add new position
    rectangle[index].x,
    rectangle[index].y,
    widthRect,
    heightRect
  );
}

let targetImg = new Image();
targetImg.src = "./circle.png";

function drawTarget() {
  context.drawImage(targetImg, target.x, target.y);
}

/* Detect collision */

function collision(front, array) {
  for (let i = 3; i < array.length; i++) {
    if (front.x == array[i].x && front.y == array[i].y) {
      return true;
    }
  }
  return false;
}

/* Score points and grow object */

let score = 0;

/* Save score to local storage */

function saveScore(points) {
  if (localStorage.getItem("score") < points) {
    localStorage.clear();
    localStorage.setItem("score", points);
  }
}

bestScore.innerText = localStorage.getItem("score");

/* Increase speed */

let speed = 140;

function speedUp(points) {
  if (points % 10 == 0) {
    speed = speed - 5;
  }
}

// Update canvas every 0.1s
let update = setInterval(drawCanvas, speed);

/* Game Start */

let overlay = document.createElement("div");
overlay.id = "overlay";

let startBtn = document.createElement("button");
startBtn.innerText = "START";
startBtn.id = "start";

overlay.appendChild(startBtn);

board.appendChild(overlay);

startBtn.addEventListener("click", startGame);
window.addEventListener("keypress", startGame);

function startGame() {
  overlay.style.display = "none";
  setTimeout(function () {
    direction = "down";
  }, 500);
}

/* class Rectangle {
  constructor(x, y, width, height, color, speed, direction, length) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.direction = direction;
    this.length = new Array(length);
  }
}

let box = new Rectangle(0, 0, 50, 50, "blue", 5, "right", 3); */
