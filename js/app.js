/* globals Card, Deck */
'use strict';

let newDeck = new Deck();
const numGameCards = 16;
const gameBoard = document.querySelector('.deck');
const gameOverModal = document.getElementById('gameOverModal');
let totalMoves = 0;
let correctGuesses = 0;
let starRating = 3;
let thisCard;
let card1;
let card2;
let thisNode;
let node1;
let node2;

function playAgain(event){
  if(event.target.nodeName === 'A'){
    newDeck.shuffle(newDeck.cards);
    setupBoard();
  }
}

function displayGameOverModal() {
  gameOverModal.classList.remove('hidden');
  gameOverModal.querySelector('a').addEventListener('click', playAgain);
}

function gameOver() {
  return correctGuesses === numGameCards / 2;
}

function doCardsMatch(c1, c2, n1, n2) {
  setTimeout(function(){
    n1.classList.remove('open', 'show');
    n2.classList.remove('open', 'show');
  }, 1000);
  if(c1.symbol === c2.symbol) {
    n1.classList.add('match');
    n2.classList.add('match');
    correctGuesses++;
    if(gameOver()) {
      displayGameOverModal();
    }
  }
  else {
    c1.isFlipped = false;
    c2.isFlipped = false;
  }
}

function respondToImageClick(event){
  if(event.target.nodeName === 'LI'){
    thisNode = event.target;
    thisCard = thisNode.currentLI;
    if(!thisCard.isFlipped){
      thisNode.classList.add('open', 'show');
      thisCard.isFlipped = true;
      thisCard.numClicks++;
      totalMoves++;
    }
  }
  if(event.target.nodeName === 'I'){
    thisNode = event.target.parentNode;
    thisCard = thisNode.currentLI;
    if(!thisCard.isFlipped){
      thisNode.classList.add('open', 'show');
      thisCard.isFlipped = true;
      thisCard.numClicks++;
      totalMoves++;
    }
  }
  if(totalMoves % 2 === 1) {
    card1 = thisCard;
    node1 = thisNode;
  }
  else {
    card2 = thisCard;
    node2 = thisNode;
    doCardsMatch(card1, card2, node1, node2);
  }
}

function setupBoard() {
  gameBoard.innerHTML = '';
  totalMoves = 0;
  correctGuesses = 0;
  starRating = 3;
  gameOverModal.classList.add('hidden');
  for(let i = 0; i < numGameCards; i++){
    newDeck.cards[i].isFlipped = false;
    newDeck.cards[i].numClicks = 0;
    let cardLI = document.createElement('li');
    cardLI.currentLI = newDeck.cards[i];
    cardLI.classList.add('card', 'open', 'show'); // Add  'open' and 'show' to the argument list to preview the cards
    let cardSymbol = document.createElement('i');
    cardSymbol.classList.add('fa', 'fa-' + newDeck.cards[i].symbol);
    cardLI.appendChild(cardSymbol);
    gameBoard.appendChild(cardLI);
  }
}

function initialize() {
  let cardImages = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
  for(let i = 0; i < numGameCards; i++){
    let newCard = new Card(cardImages[i % (numGameCards / 2)]);
    newDeck.cards.push(newCard);
  }
  newDeck.shuffle(newDeck.cards);
  gameBoard.addEventListener('click', respondToImageClick);
  setupBoard();
}

window.addEventListener('load', function() {
  initialize();
});