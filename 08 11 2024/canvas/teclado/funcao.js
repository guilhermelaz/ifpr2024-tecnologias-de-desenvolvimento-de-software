var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 640;
document.body.appendChild(canvas);

const velocidade = 5;
let pos_x = 20;
let pos_y = 20;
const raio = 20;

function desenharCirculo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(pos_x, pos_y, raio, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function moverCirculo(event) {
    switch(event.key) {
        case "ArrowUp":
            if (pos_y - raio > 0) pos_y -= velocidade;
            break;
        case "ArrowDown":
            if (pos_y + raio < canvas.height) pos_y += velocidade;
            break;
        case "ArrowLeft":
            if (pos_x - raio > 0) pos_x -= velocidade;
            break;
        case "ArrowRight":
            if (pos_x + raio < canvas.width) pos_x += velocidade;
            break;
    }
    desenharCirculo();
}

window.addEventListener("keydown", moverCirculo);