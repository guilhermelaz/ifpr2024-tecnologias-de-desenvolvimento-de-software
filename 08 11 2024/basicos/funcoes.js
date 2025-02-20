var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 640;
document.body.appendChild(canvas);

function criarRetangulo() {
    const horizontal = 200;
    const vertical = 300;
    const x = 300;
    const y = 300;
    ctx.beginPath();
    ctx.rect(x,y,horizontal,vertical);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function criarCirculo() {
    const x = 20;
    const y = 20;
    const raio = 20;
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function criarTriângulo() {
    const x1 = 100, y1 = 300;
    const x2 = 200, y2 = 100;
    const x3 = 300, y3 = 300;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fillStyle = "green";
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}


