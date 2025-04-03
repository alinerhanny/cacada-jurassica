const cards = ['img/dino1.png', 'img/dino2.png', 'img/dino3.png', 'img/dino4.png', 'img/dino5.png', 'img/dino6.png'];

const duplicateCards = cards.concat(cards);

// EMBARALHA AS CARTAS
const shuffledCards = duplicateCards.sort(() => Math.random() - 0.5);
const gameContainer = document.querySelector('.game-container');

let card1 = null;
let card2 = null;
let boardLocked = false;
let pairsFound = 0;
const totalPairs = cards.length;

// ADICIONA AS CARTAS EMBARALHADAS NO CONTAINER
shuffledCards.forEach((cardValue, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    gameContainer.appendChild(card);

    // DEFINE O ATRIBUTO QUE ARMAZENA O VALOR DAS CARTAS
    card.dataset.cardValue = cardValue;

    // EVENTO PRA VIRAR AS CARTAS
    card.addEventListener('click', () => {
        if (boardLocked || card.classList.contains('turn')) return;

        card.classList.add('turn');
        // ADD O VALOR DA URL DA VARIAVEL CSS --CARD-IMAGE
        card.style.setProperty('--card-image', `url(${shuffledCards[index]})`);

        // ARMAZENA A PRIMEIRA E A SEGUNDA CARTA VIRADA
        if (!card1) {
            card1 = card;
        } else if (!card2 && card !== card1) {
            card2 = card;
            boardLocked = true;

            // VERIFICA AS CARTAS
            if (card1.dataset.cardValue === card2.dataset.cardValue) {
                // MANTÉM VIRADA
                pairsFound++;
                card1 = null;
                card2 = null;
                boardLocked = false;
                endGame(); // VERIFICA SE O JOGO TERMINOU
            } else {
                // DESVIRA AS CARTAS
                setTimeout(() => {
                    card1.classList.remove('turn');
                    card2.classList.remove('turn');
                    card1 = null;
                    card2 = null;
                    boardLocked = false;
                }, 1000);
            }
        }
    });
});

function endGame() {
    if (pairsFound === totalPairs) {
        setTimeout(() => {
            document.querySelector('.win-container').style.display = 'flex';
        }, 500);
    }
}

// BOTÃO DE REINICIAR
document.querySelector('.restart-btn').addEventListener('click', () => {
    // Esconde o container de vitória
    document.querySelector('.win-container').style.display = 'none';
    
    // Reseta as variáveis do jogo
    card1 = null;
    card2 = null;
    boardLocked = false;
    pairsFound = 0;
    
    // Limpa o container do jogo
    gameContainer.innerHTML = '';
    
    // Embaralha novamente
    const newShuffledCards = [...duplicateCards].sort(() => Math.random() - 0.5);
    
    // Recria as cartas
    newShuffledCards.forEach((cardValue, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        gameContainer.appendChild(card);
        card.dataset.cardValue = cardValue;

        card.addEventListener('click', () => {
            if (boardLocked || card.classList.contains('turn')) return;

            card.classList.add('turn');
            card.style.setProperty('--card-image', `url(${newShuffledCards[index]})`);

            if (!card1) {
                card1 = card;
            } else if (!card2 && card !== card1) {
                card2 = card;
                boardLocked = true;

                if (card1.dataset.cardValue === card2.dataset.cardValue) {
                    pairsFound++;
                    card1 = null;
                    card2 = null;
                    boardLocked = false;
                    endGame();
                } else {
                    setTimeout(() => {
                        card1.classList.remove('turn');
                        card2.classList.remove('turn');
                        card1 = null;
                        card2 = null;
                        boardLocked = false;
                    }, 1000);
                }
            }
        });
    });
});