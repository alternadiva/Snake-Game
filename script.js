/* Draw canvas */

const board = document.getElementById("game-board");

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const widthCanvas = 500;
const heightCanvas = 500;

window.addEventListener("load", drawCanvas);

function drawCanvas() {
  canvas.setAttribute("width", widthCanvas);
  canvas.setAttribute("height", heightCanvas);

  canvas.style.backgroundColor = "grey";

  board.appendChild(canvas);
}

/* Move object */

let rectangleCoords = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
};

function draw() {
  context.clearRect(0, 0, widthCanvas, heightCanvas); //clear the previous position
  context.fillRect(
    //add new position
    rectangleCoords.x,
    rectangleCoords.y,
    rectangleCoords.width,
    rectangleCoords.height
  );
}

function update() {
  //update the position of the rectangle
  rectangleCoords.x += 1;
  rectangleCoords.y += 1;
}

function loop() {
  //animate the movement of the rectangle
  update();
  draw();

  window.requestAnimationFrame(loop);
}

loop();

class Rectangle {
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

let box = new Rectangle(0, 0, 50, 50, "blue", 5, "right", 3);

// Add key event listener

window.addEventListener("keydown", keyDown);

// Set the direction and avoid turning opposite direction
function keyDown({ which }) {
  if (which === 37 && box.direction !== "right") {
    box.direction = "left";
  } else if (which === 39 && box.direction !== "left") {
    box.direction = "right";
  } else if (which === 38 && box.direction !== "down") {
    box.direction = "up";
  } else if (which === 40 && box.direction !== "up") {
    box.direction = "down";
  }
}
