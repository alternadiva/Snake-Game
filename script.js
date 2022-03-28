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

// Add event listeners

window.addEventListener("keydown", keyDown);

function keyDown({ which }) {
  console.log(which);
}

window.addEventListener("keyup", keyup);

function keyup({ which }) {
  console.log(which);
}
