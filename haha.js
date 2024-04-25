let flippedCards = [];
const gameBoard = document.getElementById('gameBoard');
const gameMessage = document.getElementById('gameMessage');
const symbols = ['♥', '♦', '♣', '♠'];
let cards = [];

function startGame() {
  gameBoard.innerHTML = ''; 
  gameMessage.textContent = ''; 
  cards = [...symbols, ...symbols, ...symbols]; 
  shuffle(cards); 
  cards.forEach((symbol) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = '?';
    card.onclick = () => flipCard(card, symbol);
    gameBoard.appendChild(card);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard(card, symbol) {
  if (flippedCards.length < 3 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    card.textContent = symbol; 
    flippedCards.push(card);

    if (flippedCards.length === 3) {
      checkForMatch();
    }
  }
}

function checkForMatch() {
  if (flippedCards[0].textContent === flippedCards[1].textContent && flippedCards[1].textContent === flippedCards[2].textContent) {
    gameMessage.textContent = 'C\'est gagné !';
    gameMessage.className = 'text-success';
    flippedCards.forEach(card => card.style.backgroundColor = '#28a745'); 
  } else {
    setTimeout(() => {
      gameMessage.textContent = 'Perdu, essayez encore !';
      gameMessage.className = 'text-danger';
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.textContent = '?'; 
      });
      flippedCards = [];
    }, 1000);
  }
}



