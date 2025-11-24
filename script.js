const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

const CONFIG = { size: 40, cols: 0, rows: 0 };
let grid = [];

function setup() {
  canvas.width = 800;
  canvas.height = 500;
  CONFIG.cols = Math.floor(canvas.width / CONFIG.size);
  CONFIG.rows = Math.floor(canvas.height / CONFIG.size);
  reset();
}

function reset() {
  grid = [];
  for (let y = 0; y < CONFIG.rows; y++) {
    for (let x = 0; x < CONFIG.cols; x++) {
      grid.push({
        x,
        y,
        walls: [true, true, true, true],
        visited: false,
      });
    }
  }
  draw();
}

function draw() {
  ctx.fillStyle = "#000000ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#4d4d4dff";
  ctx.lineWidth = 2;
  for (let cell of grid) {
    const px = cell.x * CONFIG.size;
    const py = cell.y * CONFIG.size;
    ctx.strokeRect(px, py, CONFIG.size, CONFIG.size);
  }
}

window.app = {
  genMaze: () => alert("!"),
  mazeRunner: () => alert(),
};
setup();
