// Variáveis e Constantes
const campo = document.getElementById('campo');
const jogador1 = document.getElementById('jogador1');
const jogador2 = document.getElementById('jogador2');
const bola = document.getElementById('bola');
const mensagem = document.getElementById('mensagem');
const pontosDisplay1 = document.getElementById('pontosJogador1');
const pontosDisplay2 = document.getElementById('pontosJogador2');
const botaoReiniciar = document.getElementById('botaoReiniciar');

const campoLargura = 600;
const campoAltura = 400;
const raqueteAltura = 80;
const bolaTamanho = 15;

let pontos1 = 0;
let pontos2 = 0;
let bolaX, bolaY;
let velocidadeX, velocidadeY;
let loopJogo; 
let jogador2Y = campoAltura / 2 - raqueteAltura / 2;

function reiniciarBola() {
    bolaX = campoLargura / 2 - bolaTamanho / 2;
    bolaY = campoAltura / 2 - bolaTamanho / 2;
    
    velocidadeX = (Math.random() > 0.5 ? 2 : -2);
    velocidadeY = (Math.random() * 2 - 1); 

    jogador1.style.top = `${campoAltura / 2 - raqueteAltura / 2}px`;
    jogador2.style.top = `${jogador2Y}px`;
    
    if (!loopJogo) {
        loopJogo = setInterval(atualizarJogo, 1000 / 60);
    }
}

function atualizarPontuacao() {
    pontosDisplay1.textContent = pontos1;
    pontosDisplay2.textContent = pontos2;

    if (pontos1 >= 5 || pontos2 >= 5) {
        clearInterval(loopJogo);
        loopJogo = null;
        mensagem.textContent = (pontos1 >= 5) ? "Jogador 1 VENCEU!" : "Jogador 2 VENCEU!";
    }
}

function atualizarJogo() {
    // 1. Mover a Bola
    bolaX += velocidadeX;
    bolaY += velocidadeY;

    // 2. Colisão com o Teto/Chão
    if (bolaY < 0 || bolaY > campoAltura - bolaTamanho) {
        velocidadeY = -velocidadeY;
    }

    // 3. Colisão com as Raquetes
    
    // Raquete 1 (IA Simples)
    if (bolaX <= 20) { 
        let raquete1Y = parseFloat(jogador1.style.top);
        
        if (bolaY + bolaTamanho > raquete1Y && bolaY < raquete1Y + raqueteAltura) {
            velocidadeX = -velocidadeX * 1.05;
        }
    }
    
    // Raquete 2 (Jogador Humano)
    if (bolaX >= campoLargura - 20 - bolaTamanho) {
        let raquete2Y = parseFloat(jogador2.style.top);

        if (bolaY + bolaTamanho > raquete2Y && bolaY < raquete2Y + raqueteAltura) {
            velocidadeX = -velocidadeX * 1.05;
        }
    }
    
    // 4. Ponto
    
    // Ponto para Jogador 2
    if (bolaX < 0) {
        pontos2++;
        atualizarPontuacao();
        reiniciarBola();
    } 
    // Ponto para Jogador 1
    else if (bolaX > campoLargura - bolaTamanho) {
        pontos1++;
        atualizarPontuacao();
        reiniciarBola();
    }
    
    // 5. Movimento da Raquete 1 (IA)
    let raquete1Y = parseFloat(jogador1.style.top);
    if (bolaY > raquete1Y + raqueteAltura / 2) {
        raquete1Y += 2;
    } else if (bolaY < raquete1Y + raqueteAltura / 2) {
        raquete1Y -= 2;
    }
    raquete1Y = Math.max(0, Math.min(raquete1Y, campoAltura - raqueteAltura));
    jogador1.style.top = `${raquete1Y}px`;

    // 6. Desenhar Posições na Tela
    bola.style.left = `${bolaX}px`;
    bola.style.top = `${bolaY}px`;
    jogador2.style.top = `${jogador2Y}px`;
}

// --- Controle do Jogador 2 (Teclado) ---

document.addEventListener('keydown', (e) => {
    const velocidadeRaquetes = 15;
    
    if (e.key === 'ArrowUp') {
        jogador2Y -= velocidadeRaquetes;
    } else if (e.key === 'ArrowDown') {
        jogador2Y += velocidadeRaquetes;
    }

    jogador2Y = Math.max(0, Math.min(jogador2Y, campoAltura - raqueteAltura));
});

// --- Inicialização ---

function reiniciarJogoCompleto() {
    pontos1 = 0;
    pontos2 = 0;
    atualizarPontuacao();
    clearInterval(loopJogo);
    loopJogo = null;
    mensagem.textContent = "Use as setas ↑↓ para a raquete da direita!";
    reiniciarBola();
}

botaoReiniciar.addEventListener('click', reiniciarJogoCompleto);

reiniciarJogoCompleto();