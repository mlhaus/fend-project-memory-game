/* globals Card, Deck, Timer */
'use strict';

let newDeck = new Deck();
const timerStart = 0;
const timerEnd = 300;
let t1 = new Timer(timerStart, timerEnd);
const numGameCards = 16;
const gameBoard = document.querySelector('.deck');
const gameOverModal = document.getElementById('gameOverModal');
const totalMovesNode = document.querySelector('.moves');
const starNodes = document.querySelector('.stars');
let totalMoves = 0;
let totalClicks = 0;
let correctGuesses = 0;
let starRating = 3.0;
let thisCard;
let card1;
let card2;
let thisNode;
let node1;
let node2;

function updateStars(){
  if(totalMoves === numGameCards){
    starNodes.childNodes[2].classList.remove('fa-star');
    starNodes.childNodes[2].classList.add('fa-star-half-o');
    starRating -= 0.5;
  }
  if(totalMoves === numGameCards * 1.25){
    starNodes.childNodes[2].classList.remove('fa-star-half-o');
    starNodes.childNodes[2].classList.add('fa-star-o');
    starRating -= 0.5;
  }
  if(totalMoves === numGameCards * 1.5){
    starNodes.childNodes[1].classList.remove('fa-star');
    starNodes.childNodes[1].classList.add('fa-star-half-o');
    starRating -= 0.5;
  }
  if(totalMoves === numGameCards * 1.75){
    starNodes.childNodes[1].classList.remove('fa-star-half-o');
    starNodes.childNodes[1].classList.add('fa-star-o');
    starRating -= 0.5;
  }
}

function startNewGame() {
  t1.startValue = timerStart;
  t1.stopValue = timerEnd;
  t1.isPaused = false;
  t1.startPause();
  newDeck.shuffle(newDeck.cards);
  setupBoard();
}

function playAgain(event){
  if(event.target.nodeName === 'A' || event.target.nodeName === 'I'){
    startNewGame();
  }
}

function startPause(event){
  if(event.target.nodeName === 'I' || event.target.nodeName === 'SPAN'){
    t1.startPause();
  }
}

function displayGameOverModal() {
  t1.startPause();
  gameOverModal.querySelector('#moveSummary').textContent = totalMoves + ' Moves';
  gameOverModal.querySelector('#starSummary').textContent = starRating;
  gameOverModal.querySelector('#starSummary').textContent += (( starRating === 1) ? ' Star' : ' Stars');
  gameOverModal.querySelector('#timeSummary').textContent = t1.minutes + ':' + t1.seconds;
  gameOverModal.classList.remove('hidden');
  gameOverModal.querySelector('a').addEventListener('click', startNewGame);
  
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
  if(event.target.nodeName === 'LI' || event.target.nodeName === 'I') {
    if(event.target.nodeName === 'LI'){
      thisNode = event.target;
      thisCard = thisNode.currentLI;
    }
    if(event.target.nodeName === 'I'){
      thisNode = event.target.parentNode;
      thisCard = thisNode.currentLI;
    }
    if(!thisCard.isFlipped){
      thisNode.classList.add('open', 'show');
      thisCard.isFlipped = true;
      thisCard.numClicks++;
      totalClicks++;

      if(totalClicks % 2 === 1) {
        card1 = thisCard;
        node1 = thisNode;
      }
      else {
        totalMovesNode.textContent = ++totalMoves;
        updateStars();
        card2 = thisCard;
        node2 = thisNode;
        doCardsMatch(card1, card2, node1, node2);
      }
    }
  }
}

function setupBoard() {
  gameBoard.innerHTML = '';
  totalMoves = 0;
  totalMovesNode.textContent = totalMoves;
  totalClicks = 0;
  correctGuesses = 0;
  starRating = 3.0;
  starNodes.innerHTML = '';
  for(let i = 0; i < 3; i++){
    let starI = document.createElement('i');
    starI.classList.add('fa', 'fa-star');
    starNodes.appendChild(starI);
  }
  t1.startPause();
  gameOverModal.classList.add('hidden');
  for(let i = 0; i < numGameCards; i++){
    newDeck.cards[i].isFlipped = false;
    newDeck.cards[i].numClicks = 0;
    let cardLI = document.createElement('li');
    cardLI.currentLI = newDeck.cards[i];
    cardLI.classList.add('card'); // Add  'open' and 'show' to the argument list to preview the cards
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
  document.querySelector('.restart').addEventListener('click', playAgain);
  timer.addEventListener('click', startPause);
  setupBoard();
}

window.addEventListener('load', function() {
  initialize();
});