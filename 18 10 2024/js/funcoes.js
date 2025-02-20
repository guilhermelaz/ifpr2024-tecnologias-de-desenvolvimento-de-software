var vet = new Array();
var lin = 10;
var col = 10;
var largura = 80;
var altura = 80;

const personagemStart = [];
const objetivoPosition = [];

var count = 0;

function criaTabela() {
  pai = document.getElementsByTagName("div")[0];
  tb = document.createElement("table");
  tb.setAttribute("border", 1);
  for (let i = 0; i < lin; i++) {
    tr = document.createElement("tr");
    for (let j = 0; j < col; j++) {
      td = document.createElement("td");
      td.setAttribute("width", largura);
      td.setAttribute("height", altura);
      td.setAttribute("id", i + "," + j);
      tr.appendChild(td);
    }
    if (i == 0) {
      td = document.createElement("td");
      td.setAttribute("width", largura);
      td.setAttribute("valign", "top");
      td.setAttribute("id", "comandos");
      td.setAttribute("rowspan", lin);
      tr.appendChild(td);
    }
    tb.appendChild(tr);
  }
  pai.appendChild(tb);
  posicionarElementos();
}

function posicionarElementos() {
  personagem = document.createElement("img");
  personagem.setAttribute("src", "img/personagem.png");
  personagem.setAttribute("width", largura);
  personagem.setAttribute("height", altura);
  personagem.setAttribute("id", "personagem");
  personagemCol = Math.floor(Math.random() * (col - 1 - 0 + 1)) + 0;
  personagemLin = Math.floor(Math.random() * ((lin - 1) / 2 - 0 + 1)) + 0;

  personagemStart[0] = personagemCol;
  personagemStart[1] = personagemLin;

  objetivo = document.createElement("img");
  objetivo.setAttribute("src", "img/objetivo.png");
  objetivo.setAttribute("width", largura);
  objetivo.setAttribute("height", altura);
  objetivo.setAttribute("id", "objetivo");
  objetivoCol = Math.floor(Math.random() * (col - 1 - 0 + 1)) + 0;
  objetivoLin = Math.floor(
    Math.random() * (lin - 1 - (lin - 1) / 2 + 1) + (lin - 1) / 2
  );

  objetivoPosition[0] = objetivoCol;
  objetivoPosition[1] = objetivoLin;

  posPersonagem = personagemLin + "," + personagemCol;
  posObjetivo = objetivoLin + "," + objetivoCol;

  cel = document.getElementById(posPersonagem);
  cel.appendChild(personagem);
  cel = document.getElementById(posObjetivo);
  cel.appendChild(objetivo);

  console.log("Personagem: " + posPersonagem);
  console.log("Objetivo: " + posObjetivo);
}

function comandos(e) {
  id = parseInt(e.id);
  cel = document.getElementById("comandos");
  switch (id) {
    case 0:
      vet.push(0);
      cel.innerHTML += "Esquerda<br/>";
      break;
    case 1:
      vet.push(1);
      cel.innerHTML += "Direita<br/>";
      break;
    case 2:
      vet.push(2);
      cel.innerHTML += "Acima<br/>";
      break;
    case 3:
      vet.push(3);
      cel.innerHTML += "Abaixo<br/>";
      break;
  }
}

function run() {
  i = 0;

  desativarbotoes();
  const jogar = setInterval(() => {
    if (i < vet.length) {
      move();
    } else {
      clearInterval(jogar);
      verseganhou();
    }
  }, 500);
}

function move() {
  if (i < vet.length) {
    personagem = document.getElementById("personagem");
    cel = personagem.parentElement;
    pos = cel.id;
    pos = pos.split(",").map(Number);

    switch (vet[i]) {
      case 2: // cima
        pos[0]--;
        break;
      case 3: // baixo
        pos[0]++;
        break;
      case 0: // esquerda
        pos[1]--;
        break;
      case 1: // direita
        pos[1]++;
        break;
    }

    nova = document.getElementById(pos[0] + "," + pos[1]);
    if (nova) {
      cel.removeChild(personagem);
      nova.appendChild(personagem);
      cel = nova;
    } else {
      perdeu();
    }
    i++;
  }
}

function perdeu() {
  alert("Você perdeu!");
  location.reload();
}

function desativarbotoes() {
  botoes = document.getElementsByTagName("button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true;
  }
}

function verseganhou() {
  personagem = document.getElementById("personagem");
  cel = personagem.parentElement;
  pos = cel.id;
  objetivo = document.getElementById("objetivo");
  cel = objetivo.parentElement;
  posObjetivo = cel.id;
  if (pos == posObjetivo) {
    cel.appendChild(personagem);
    setTimeout(() => {
      alert("Você ganhou!");
      location.reload();
    }, 100);
  } else {
    perdeu();
  }
}

function buscaProfundidade() {
  const queue = [[...personagemStart]]; // Fila para BFS
  const visited = Array.from({ length: lin }, () => Array(col).fill(false));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // direita, baixo, esquerda, cima

  visited[personagemStart[1]][personagemStart[0]] = true;

  const animateMove = () => {
    if (queue.length === 0) return;

    const [currentRow, currentCol] = queue.shift();

    if (
      currentCol === objetivoPosition[0] &&
      currentRow === objetivoPosition[1]
    ) {
      verseganhou();
      return;
    }

    for (const [dx, dy] of directions) {
      const newRow = currentRow + dx;
      const newCol = currentCol + dy;

      if (
        newRow >= 0 &&
        newRow < lin &&
        newCol >= 0 &&
        newCol < col &&
        !visited[newRow][newCol]
      ) {
        queue.push([newRow, newCol]);
        visited[newRow][newCol] = true;
      }
    }

    if (queue.length > 0) {
      const [nextRow, nextCol] = queue[0];
      const currentCell = document.getElementById(
        `${currentRow},${currentCol}`
      );
      const nextCell = document.getElementById(`${nextRow},${nextCol}`);

      if (currentCell && nextCell) {
        currentCell.innerHTML = "";
        nextCell.appendChild(personagem);
      }
    }

    setTimeout(animateMove, 250);
  };

  animateMove();
}

function buscaBinaria() {
  let posAtual = document.getElementById(
    personagemStart[1] + "," + personagemStart[0]
  );
  // posAtual.style.backgroundColor = "yellow"; // NO MEU ISSO NÃO FUNCIONA

  const animateMove = () => {
    if (
      personagemStart[1] === objetivoPosition[1] &&
      personagemStart[0] === objetivoPosition[0]
    ) {
      verseganhou();
      return;
    }

    if (personagemStart[1] > objetivoPosition[1]) {
      personagemStart[1]--;
    } else if (personagemStart[1] < objetivoPosition[1]) {
      personagemStart[1]++;
    }
    if (personagemStart[0] > objetivoPosition[0]) {
      personagemStart[0]--;
    } else if (personagemStart[0] < objetivoPosition[0]) {
      personagemStart[0]++;
    }

    posAtual.innerHTML = "";

    posAtual = document.getElementById(
      personagemStart[1] + "," + personagemStart[0]
    );
    posAtual.appendChild(personagem);
    // posAtual.style.backgroundColor = "yellow"; // NO MEU ISSO NÃO FUNCIONA
    setTimeout(animateMove, 250);
  };

  animateMove();
}

function buscaPrimm() {
  const startRow = personagemStart[1];
  const startCol = personagemStart[0];
  const objetivoRow = objetivoPosition[1];
  const objetivoCol = objetivoPosition[0];

  let tree = new Set();
  tree.add(`${startRow},${startCol}`);

  let edges = [];
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0], // direita, baixo, esquerda, cima
  ];

  const calculatePriority = (row, col) => {
    return Math.abs(row - objetivoRow) + Math.abs(col - objetivoCol);
  };

  directions.forEach(([dx, dy]) => {
    const newRow = startRow + dx;
    const newCol = startCol + dy;
    if (newRow >= 0 && newRow < lin && newCol >= 0 && newCol < col) {
      edges.push({
        row: newRow,
        col: newCol,
        priority: calculatePriority(newRow, newCol),
      });
    }
  });

  edges.sort((a, b) => a.priority - b.priority);

  const animateMove = () => {
    if (tree.has(`${objetivoRow},${objetivoCol}`)) {
      verseganhou();
      return;
    }

    const currentEdge = edges.shift();
    const currentKey = `${currentEdge.row},${currentEdge.col}`;

    if (!tree.has(currentKey)) {
      tree.add(currentKey);

      const currentCell = document.getElementById(currentKey);
      const personagem = document.getElementById("personagem");
      const previousCell = personagem.parentElement;
      previousCell.removeChild(personagem);
      currentCell.appendChild(personagem);

      if (currentEdge.row === objetivoRow && currentEdge.col === objetivoCol) {
        verseganhou();
        return;
      }

      directions.forEach(([dx, dy]) => {
        const newRow = currentEdge.row + dx;
        const newCol = currentEdge.col + dy;
        const newKey = `${newRow},${newCol}`;
        if (
          newRow >= 0 &&
          newRow < lin &&
          newCol >= 0 &&
          newCol < col &&
          !tree.has(newKey)
        ) {
          edges.push({
            row: newRow,
            col: newCol,
            priority: calculatePriority(newRow, newCol),
          });
        }
      });

      edges.sort((a, b) => a.priority - b.priority);
    }

    setTimeout(animateMove, 250);
  };

  desativarbotoes();
  animateMove();
}
