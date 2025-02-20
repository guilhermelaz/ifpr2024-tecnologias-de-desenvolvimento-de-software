const lines = 20;
const columns = 20;

const width = 45;
const height = 45;

const bowlNeighbors = [];
const fishNeighbors = [];

function startGame() {
  if (bowlNeighbors.length === 0) {
    findNeighbors(bowlLine, bowlColumn, bowlNeighbors);
  }
  findNeighbors(fishLine, fishColumn, fishNeighbors);
}

function createTable() {
  const parent = document.getElementById("table");
  const table = document.createElement("table");

  for (let i = 0; i < lines; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i},${j}`);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  parent.appendChild(table);
  positionElements();
}

function positionElements() {
  fish = document.createElement("img");
  fish.setAttribute("src", "fish.png");
  fish.setAttribute("width", width);
  fish.setAttribute("height", height);
  fish.setAttribute("id", "fish");
  fishColumn = Math.floor(Math.random() * (columns - 1 - 0 + 1)) + 0;
  fishLine = Math.floor(Math.random() * ((lines - 1) / 2 - 0 + 1)) + 0;

  bowl = document.createElement("img");
  bowl.setAttribute("src", "bowl.png");
  bowl.setAttribute("width", width);
  bowl.setAttribute("height", height);
  bowl.setAttribute("id", "bowl");
  bowlColumn = Math.floor(Math.random() * (columns - 1 - 0 + 1)) + 0;
  bowlLine = Math.floor(
    Math.random() * (lines - 1 - (lines - 1) / 2 + 1) + (lines - 1) / 2
  );

  fishPosition = fishLine + "," + fishColumn;
  bowlPosition = bowlLine + "," + bowlColumn;

  cell = document.getElementById(fishPosition);
  cell.appendChild(fish);

  cell = document.getElementById(bowlPosition);
  cell.appendChild(bowl);

  bowlNeighbors.push(bowlPosition);
}

function findNeighbors(line, column, neighbors) {
  const moves = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  for (const [dx, dy] of moves) {
    const newLine = line + dx;
    const newColumn = column + dy;

    if (
      newLine >= 0 &&
      newLine < lines &&
      newColumn >= 0 &&
      newColumn < columns
    ) {
      neighbors.push(`${newLine},${newColumn}`);
      // document.getElementById(`${newLine},${newColumn}`).innerHTML = 'N';
    }
  }
  setTimeout(calculateDistance, 250);
}

function calculateDistance() {
  let minDistance = Infinity;
  let minPosition = "";
  let x1, y1, x2, y2;

  for (let i = 0; i < fishNeighbors.length; i++) {
    let fishValues = fishNeighbors[i].split(",").map(Number);
    x1 = fishValues[0];
    y1 = fishValues[1];

    for (let j = 0; j < bowlNeighbors.length; j++) {
      let bowlValues = bowlNeighbors[j].split(",").map(Number);
      x2 = bowlValues[0];
      y2 = bowlValues[1];

      let distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      if (distance < minDistance) {
        minDistance = distance;
        minPosition = `${x1},${y1}`;
      }
    }
  }

  if (minPosition) {
    document.getElementById(minPosition).style.backgroundColor = "#ffe4b5";
    document.getElementById(minPosition).appendChild(fish);
  }

  if (minPosition === bowlPosition) {
    document.getElementById(minPosition).appendChild(fish);
    setTimeout(() => {
      alert("Chegou ao aquario");
    }, 500);
    return;
  }

  let v = minPosition.split(",").map(Number);
  findNeighbors(v[0], v[1], fishNeighbors);
}
