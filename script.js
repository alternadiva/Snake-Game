/* Add canvas */

const board = document.getElementById("game-board");
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const width = 500;
const height = 500;
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
canvas.style.backgroundColor = "grey";

board.appendChild(canvas);

let rectangle = {
  x: 0,
  y: 0,
};

function draw() {
  context.fillRect(rectangle.x, rectangle.y, 50, 50);
}

draw();
