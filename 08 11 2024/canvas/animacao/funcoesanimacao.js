var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 640;
document.body.appendChild(canvas);

const velocidade = 10;
let x = 20;

function moveCircle() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  x += velocidade;
  const y = 20;
  const raio = 20;
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function runAnimation() {
  setInterval(moveCircle, 50);
}
