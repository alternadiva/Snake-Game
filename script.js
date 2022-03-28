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
};

function draw() {
  context.clearRect(0, 0, widthCanvas, heightCanvas); //clear the previous position
  context.fillRect(rectangleCoords.x, rectangleCoords.y, 50, 50); //add new position
}

function update() {
  //update the position of the rectangle
  rectangleCoords.x += 1;
}

function loop() {
  //animate the movement of the rectangle
  update();
  draw();

  window.requestAnimationFrame(loop);
}

loop();
