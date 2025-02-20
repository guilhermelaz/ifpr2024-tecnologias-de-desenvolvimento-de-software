var vet = new Array();
var lin=10;
var col=10;
var largura=80;
var altura=80;
var posCasa="";
var msg=null;
var cont=0;
const robotStart = []; // Posição inicial do robô
const housePosition = []; // Posição da casa
function criaTabela() {
    pai=document.getElementsByTagName("div")[0];
    tb=document.createElement("table");
    tb.setAttribute("border",1);

    for(let i=0;i<lin;i++){
        tr=document.createElement("tr");
        for(let j=0;j<col;j++){
            td=document.createElement("td");
            td.setAttribute("width",largura);
            td.setAttribute("height",altura);
            td.setAttribute("id",(i+","+j));
            tr.appendChild(td);
        }
        if(i==0){
            td=document.createElement("td");
            td.setAttribute("width",largura);
            td.setAttribute("valign","top");
            td.setAttribute("id","comandos");
            td.setAttribute("rowspan",lin);
            tr.appendChild(td);
        }
        tb.appendChild(tr);
    }
     pai.appendChild(tb);
    posicionarElementos();
}
function posicionarElementos(){
    robo=document.createElement("img");
    robo.setAttribute("src","img/robo.png");
    robo.setAttribute("width",largura);
    robo.setAttribute("id","robo");
    robo.setAttribute("height",altura);
    roboCol=Math.floor(Math.random() * ((col-1) - 0 + 1)) + 0;
    roboLin=Math.floor(Math.random() * ((lin-1)/2 - 0 + 1)) + 0;
    robotStart[0]=roboCol;
    robotStart[1]=roboLin;

    casa=document.createElement("img");
    casa.setAttribute("src","img/casa.png");
    casa.setAttribute("width",largura);
    casa.setAttribute("height",altura);
    casaCol=Math.floor(Math.random() * ((col-1) - 0 + 1)) + 0;
    casaLin=Math.floor(Math.random() * ((lin-1) - (lin-1)/2 + 1)+ (lin-1)/2);
    housePosition[0]=casaCol;
    housePosition[1]=casaLin;

    posRobo=roboLin+","+roboCol;
    posCasa=casaLin+","+casaCol;

    cel=document.getElementById(posRobo);
    cel.appendChild(robo);
    cel=document.getElementById(posCasa);
    cel.appendChild(casa);
}
function run() {
    i=0;
    tempo=setInterval(move, 1000);
}
function move(){
    msg=document.getElementById("msg");
    if(i<vet.length) {
        robo = document.getElementById("robo");
        cel = robo.parentElement;
        pos = cel.id;
        pos = pos.split(",");
        switch (vet[i]) {
            case 0:
                pos[1]--;
                break;
            case 1:
                pos[1]++;
                break;
            case 2:
                pos[0]--;
                break;
            case 3:
                pos[0]++;
                break;
        }
        if(pos[0]>=0&&pos[0]<lin&&pos[1]>=0&&pos[1]<col) {
            nova = document.getElementById(pos[0] + "," + pos[1]);
            cel.removeChild(robo);
            nova.appendChild(robo);
            cel = nova;
            i++;

        }
        else {
            msg.innerHTML="posição inválida";
            clearInterval(tempo);

        }
    }
    verificaObjetivo(cel.id);
}
function verificaObjetivo(robo){
   if(robo.localeCompare(posCasa)==0){
       msg.innerHTML="Chegou";
       clearInterval(tempo);

   }
}
function comandos(e) {
    id=parseInt(e.id);
    cel=document.getElementById("comandos");
   switch (id){
       case 0:
           vet.push(0);
           cel.innerHTML+="Esquerda<br>";
           break;
       case 1:
           vet.push(1);
           cel.innerHTML+="Direita<br>";
           break;
       case 2:
           vet.push(2);
           cel.innerHTML+="Acima<br>";
           break;
       case 3:
           vet.push(3);
           cel.innerHTML+="Abaixo<br>";
           break;
   }
}

function buscaPorfundidade() {
    const queue = [[...robotStart]]; // Fila para BFS
    const visited = Array.from({ length: 10 }, () => Array(10).fill(false));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // direita, baixo, esquerda, cima
    
    visited[robotStart[0]][robotStart[1]] = true;
    
    const animateMove = () => {
    if (queue.length === 0) return;
    
    const [currentRow, currentCol] = queue.shift();
    
    // Se o robô chegou à casa
    if (currentCol === housePosition[0] && currentRow === housePosition[1]) {
    console.log("Chegou na casa!");
    return;
    }
    
    // Atualiza a posição do robô na tabela
    const currentCell = document.getElementById(`${currentRow},${currentCol}`);
    currentCell.innerHTML = cont++; // Remove o robô da posição atual
    
    // Explora as células adjacentes
    for (const [dx, dy] of directions) {
    const newRow = currentRow + dx;
    const newCol = currentCol + dy;
    
    if (
    newRow >= 0 && newRow < 10 &&
    newCol >= 0 && newCol < 10 &&
    !visited[newRow][newCol]
    ) {
    queue.push([newRow, newCol]);
    visited[newRow][newCol] = true;
    }
    }
    
    // Move o robô para a próxima posição
    if (queue.length > 0) {
    const nextPos = queue[0]; // A próxima posição a ser visitada
    const nextCell = document.getElementById(`${nextPos[0]},${nextPos[1]}`);
    nextCell.appendChild(robo); // Adiciona o robô na nova posição
    }
    
    setTimeout(animateMove, 500); // Atraso para animação
    };
    
    animateMove();
    }