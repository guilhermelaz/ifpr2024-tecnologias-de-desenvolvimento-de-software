var corpo = document.getElementsByTagName("body")[0];
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var vetElementos = [];
var tempo = 0;
var bolas = 0;
var tokens = false;

var MAX = 500;
var T = 1;
var vetToken = [];

var token = {
    r: 15,
    cria: function(cor) {
        let x = Math.floor(Math.random() * canvas.width);
        let y = Math.floor(Math.random() * canvas.height);
        vetToken.push({x, y, cor});
    },
    desenha: function() {
        vetToken.forEach(token => {
            ctx.beginPath();
            ctx.arc(token.x, token.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = token.cor;
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.closePath();
        });
    }
}

var bola = {
    r: 10,
    vel: 0.5,

    cria: function() {
        vetElementos.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            r: this.r,
            dirX: Math.random() < 0.5 ? -this.vel : this.vel,
            dirY: Math.random() < 0.5 ? -this.vel : this.vel,
        });
    },

    desenha: function() {
        vetElementos.forEach((elemento) => {
            ctx.beginPath();
        
            ctx.arc(elemento.x, elemento.y, elemento.r, 0, Math.PI * 2);
            ctx.fillStyle = elemento.cor || "blue";
            ctx.fill();
            ctx.closePath();
        });
    },

    move: function() {
        vetElementos.forEach((elemento, i) => {
            elemento.x += elemento.dirX;
            elemento.y += elemento.dirY;

            if (elemento.x + elemento.r > canvas.width || elemento.x - elemento.r < 0) {
                elemento.dirX = -elemento.dirX;
            }

            if (elemento.y + elemento.r > canvas.height || elemento.y - elemento.r < 0) {
                elemento.dirY = -elemento.dirY;
            }

            for (let j = i + 1; j < vetElementos.length; j++) {
                let outraBola = vetElementos[j];
                let dx = elemento.x - outraBola.x;
                let dy = elemento.y - outraBola.y;
                let distancia = Math.sqrt(dx * dx + dy * dy);

                if (distancia < elemento.r + outraBola.r) {
                    let angulo = Math.atan2(dy, dx);
                    let speed1 = Math.sqrt(elemento.dirX * elemento.dirX + elemento.dirY * elemento.dirY);
                    let speed2 = Math.sqrt(outraBola.dirX * outraBola.dirX + outraBola.dirY * outraBola.dirY);

                    elemento.dirX = speed2 * Math.cos(angulo);
                    elemento.dirY = speed2 * Math.sin(angulo);
                    outraBola.dirX = speed1 * Math.cos(angulo + Math.PI);
                    outraBola.dirY = speed1 * Math.sin(angulo + Math.PI);
                }
            }
        });
    },
};

function jogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (tempo % T === 0 && bolas < MAX) {
        bola.cria();
        bolas++;
    }

    kmeans();
    bola.desenha();
    if (bolas < MAX) {
        tempo++;
    }

    bola.move();
    requestAnimationFrame(jogo);
}



function kmeans() {
    if (!tokens) {
        criaTokens();
        tokens = true;
    }
    token.desenha();

    vetElementos.forEach((elemento) => {
        let let_menor = canvas.width + canvas.height;
        let cor;

        for (let j = 0; j < vetToken.length; j++) {
            let dx = elemento.x - vetToken[j].x;
            let dy = elemento.y - vetToken[j].y;
            let distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < let_menor) {
                let_menor = distancia;
                cor = vetToken[j].cor;
            }
        }

        elemento.cor = cor;
    });
}

function criaTokens() {
    token.cria("green");
    token.cria("blue");
    token.cria("red");
    
}


function animarComKmeans() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    vetToken.forEach(token => {
        ctx.beginPath();
        ctx.arc(token.x, token.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = token.cor;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    });

    bola.move();
    bola.desenha();
    kmeans();
    requestAnimationFrame(animarComKmeans);
}


function inicio() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    corpo.appendChild(canvas);
    jogo();
}

inicio();