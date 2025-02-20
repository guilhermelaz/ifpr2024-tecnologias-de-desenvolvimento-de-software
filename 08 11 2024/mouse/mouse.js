var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;
document.body.appendChild(canvas);

// Bolinha que se move
let pos_x = 200;
let pos_y = 200;
let raio = 20;
const velocidadeMaxima = 2;
let animacaoEmAndamento = false;
let destino_x, destino_y;

// Bolinha estática
let bolinhaEstatica = {
    x: Math.random() * (canvas.width - 60) + 30,
    y: Math.random() * (canvas.height - 60) + 30,
    raio: 30,
    existe: true
};

function desenharCirculoMouse() {
    ctx.beginPath();
    ctx.arc(pos_x, pos_y, raio, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function desenharBolinhaEstatica() {
    if (bolinhaEstatica.existe) {
        ctx.beginPath();
        ctx.arc(bolinhaEstatica.x, bolinhaEstatica.y, bolinhaEstatica.raio, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

function detectarColisao() {
    if (!bolinhaEstatica.existe) return;

    const dx = pos_x - bolinhaEstatica.x;
    const dy = pos_y - bolinhaEstatica.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < raio + bolinhaEstatica.raio) {
        console.log("Colisão detectada!");
        // Aumenta o raio da bolinha em movimento
        raio += bolinhaEstatica.raio;
        // Remove a bolinha estática
        bolinhaEstatica.existe = false;
    }
}

function atualizarPosicao() {
    const dx = destino_x - pos_x;
    const dy = destino_y - pos_y;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    
    if (distancia > 0) {
        const movimento = Math.min(distancia, velocidadeMaxima);

        pos_x += (dx / distancia) * movimento;
        pos_y += (dy / distancia) * movimento;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharBolinhaEstatica();
        desenharCirculoMouse();

        detectarColisao();
        requestAnimationFrame(atualizarPosicao);
    } else {
        pos_x = destino_x;
        pos_y = destino_y;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharBolinhaEstatica();
        desenharCirculoMouse();
        animacaoEmAndamento = false;
    }
}

function moverParaClique(event) {
    const rect = canvas.getBoundingClientRect();
    destino_x = event.clientX - rect.left;
    destino_y = event.clientY - rect.top;

    if (!animacaoEmAndamento) {
        animacaoEmAndamento = true;
        atualizarPosicao();
    }
}

canvas.addEventListener("mousemove", moverParaClique);

// Desenho inicial
desenharBolinhaEstatica();
desenharCirculoMouse();