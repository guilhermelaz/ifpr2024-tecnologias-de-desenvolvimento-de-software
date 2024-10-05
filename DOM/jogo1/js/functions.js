var vector = new Array();

function createTable() {
  let parent = document.getElementById("table");
  let table = document.createElement("table");

  table.setAttribute("border", "1");

  let lines = 10;
  let columns = 10;

  for (let i = 0; i < lines; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      let td = document.createElement("td");
      td.setAttribute("width", "50");
      td.setAttribute("height", "50");
      td.setAttribute("id", `${i}-${j}`);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  parent.appendChild(table);
}

function commands(e) {
  switch (e.id) {
    case 0:
        vector.push("up");
      break;
    case 1:
        vector.push("down");
      break;
    case 2:
        vector.push("left");
      break;
    case 3:
        vector.push("right");
      break;
  }
}
