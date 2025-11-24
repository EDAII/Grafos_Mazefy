const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CONFIG = { size: 40, cols: 0, rows: 0 };
const DIR = [
  { x: 0, y: -1, w: 0, opp: 2 },
  { x: 1, y: 0, w: 1, opp: 3 },
  { x: 0, y: 1, w: 2, opp: 0 },
  { x: -1, y: 0, w: 3, opp: 1 },
];
let grid = [],
  isRunning = false;

function setup() {
  canvas.width = 800;
  canvas.height = 500;
  CONFIG.cols = Math.floor(canvas.width / CONFIG.size);
  CONFIG.rows = Math.floor(canvas.height / CONFIG.size);
  reset();
}

function reset() {
  if (isRunning) return;
  grid = [];
  for (let y = 0; y < CONFIG.rows; y++) {
    for (let x = 0; x < CONFIG.cols; x++) {
      grid.push({
        x,
        y,
        walls: [true, true, true, true],
        visited: false,
        searched: false,
      });
    }
  }
  draw();
}

const index = (x, y) =>
  x < 0 || y < 0 || x >= CONFIG.cols || y >= CONFIG.rows
    ? -1
    : x + y * CONFIG.cols;

function draw(current = null) {
  ctx.fillStyle = "#000000ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let cell of grid) {
    const px = cell.x * CONFIG.size,
      py = cell.y * CONFIG.size;

    if (cell.visited) ctx.fillStyle = "#51807dff";
    if (cell === current) ctx.fillStyle = "#ebebebff";

    if (cell.visited || cell === current)
      ctx.fillRect(px, py, CONFIG.size, CONFIG.size);

    ctx.strokeStyle = "#4d4d4dff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const drawLine = (x1, y1, x2, y2) => {
      ctx.moveTo(px + x1, py + y1);
      ctx.lineTo(px + x2, py + y2);
    };
    if (cell.walls[0]) drawLine(0, 0, CONFIG.size, 0);
    if (cell.walls[1]) drawLine(CONFIG.size, 0, CONFIG.size, CONFIG.size);
    if (cell.walls[2]) drawLine(CONFIG.size, CONFIG.size, 0, CONFIG.size);
    if (cell.walls[3]) drawLine(0, CONFIG.size, 0, 0);
    ctx.stroke();
  }
}

async function genMaze() {
  if (isRunning) return;
  isRunning = true;
  reset();

  let stack = [],
    current = grid[0];
  current.visited = true;
  stack.push(current);

  while (stack.length > 0) {
    current = stack.pop();
    let neighbors = DIR.map((d) => ({
      cell: grid[index(current.x + d.x, current.y + d.y)],
      dir: d,
    })).filter((n) => n.cell && !n.cell.visited);

    if (neighbors.length > 0) {
      stack.push(current);
      let chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
      current.walls[chosen.dir.w] = false;
      chosen.cell.walls[chosen.dir.opp] = false;
      chosen.cell.visited = true;
      stack.push(chosen.cell);
    }
    draw(current);
    await sleep(5);
  }
  draw();
  isRunning = false;
}

window.app = {
  genMaze,
  mazeRunner: () => alert(),
};
setup();
