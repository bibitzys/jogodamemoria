const imagens = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8D-tHKHiexvLRAWy0jSbd9_5hZuXDjpJXbA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnoFehHPlmUs-JFFA-4kgb-mC3Gz9BStc0Ew&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaokCyQBCMa_Ixq1aBaTzP6DYWbvMTNhQ5Hw&s'
];

const quantidadeDeCartas = 6; // Total de cartas no jogo (pares)
const tabuleiro = document.getElementById('tabuleiro');

let cartas = [];
let cartasViradas = 0;

// Função para embaralhar um array
function embaralhar(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Criar cartas duplas e embaralhar
function criarCartas() {
    // Criar pares
    const pares = [...imagens, ...imagens];
    embaralhar(pares);

    pares.forEach((imagem, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.dataset.index = index;
        carta.dataset.imagem = imagem;
        carta.dataset.virada = 'false';

        const inner = document.createElement('div');
        inner.className = 'carta-inner';

        const frente = document.createElement('div');
        frente.className = 'carta-front';

        const back = document.createElement('div');
        back.className = 'carta-back';

        const img = document.createElement('img');
        img.src = 'imagens/verso.png'; // Imagem do verso da carta
        back.appendChild(img);

        // Imagem da frente
        const imgFrente = document.createElement('img');
        imgFrente.src = imagem;
        frente.appendChild(imgFrente);

        inner.appendChild(frente);
        inner.appendChild(back);
        carta.appendChild(inner);

        // Evento de clique
        carta.addEventListener('click', () => virarCarta(carta));

        tabuleiro.appendChild(carta);
        cartas.push(carta);
    });
}

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

function virarCarta(carta) {
    if (bloqueado || carta.dataset.virada === 'true') return;

    // Girar a carta
    carta.classList.toggle('rotada');
    carta.dataset.virada = 'true';

    if (!primeiraCarta) {
        primeiraCarta = carta;
    } else if (!segundaCarta && carta !== primeiraCarta) {
        segundaCarta = carta;
        verificarPar();
    }
}

function verificarPar() {
    const img1 = primeiraCarta.querySelector('.carta-front img').src;
    const img2 = segundaCarta.querySelector('.carta-front img').src;

    if (img1 === img2) {
        // Par encontrado
        primeiraCarta = null;
        segundaCarta = null;
        cartasViradas += 2;

        if (cartasViradas === cartas.length) {
            alert('Parabéns! Você virou todas as cartas!');
        }
    } else {
        // Não é par, virar de volta após um delay
        bloqueado = true;
        setTimeout(() => {
            primeiraCarta.classList.remove('rotada');
            segundaCarta.classList.remove('rotada');
            primeiraCarta.dataset.virada = 'false';
            segundaCarta.dataset.virada = 'false';
            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;
        }, 1000);
    }
}

// Inicializar o jogo
criarCartas();
