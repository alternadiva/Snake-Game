/* Draw canvas */

const board = document.getElementById("game-board");

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const widthCanvas = 400;
const heightCanvas = 400;

window.addEventListener("load", drawCanvas);

function drawCanvas() {
  canvas.setAttribute("width", widthCanvas);
  canvas.setAttribute("height", heightCanvas);

  canvas.style.backgroundColor = "grey";

  //grow tail
  for (let i = 0; i < rectangle.length; i++) {
    drawRect(i);
  }

  //move head
  let x = rectangle[0].x;
  let y = rectangle[0].y;

  if (direction === "left") {
    rectangle[0].x -= rectangle[0].width;
  } else if (direction === "right") {
    rectangle[0].x += rectangle[0].width;
  } else if (direction === "up") {
    rectangle[0].y -= rectangle[0].height;
  } else if (direction === "down") {
    rectangle[0].y += rectangle[0].height;
  }

  drawTarget();

  board.appendChild(canvas);
}

/* Move object */

let rectangle = [];

rectangle[0] = {
  x: Math.floor(widthCanvas / 2),
  y: Math.floor(heightCanvas / 2),
  width: 20,
  height: 20,
};

function drawRect(index) {
  context.clearRect(0, 0, widthCanvas, heightCanvas); //clear the previous position
  context.fillRect(
    //add new position
    rectangle[index].x,
    rectangle[index].y,
    rectangle[index].width,
    rectangle[index].height
  );
}

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

let target = {
  x: Math.floor(Math.random() * (widthCanvas - 1)),
  y: Math.floor(Math.random() * (heightCanvas - 1)),
};

function drawTarget() {
  context.fillStyle = "blue";
  context.fillRect(target.x, target.y, rectangle[0].width, rectangle[0].height);
}

// Update canvas every 0.1s
setInterval(drawCanvas, 100);

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
