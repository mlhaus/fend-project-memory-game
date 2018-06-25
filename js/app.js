/* globals Card, Deck */
'use strict';

let newDeck = new Deck();
const numGameCards = 16;
const gameBoard = document.querySelector('.deck');
const gameOverModal = document.getElementById('gameOverModal');
const totalMovesNode = document.querySelector('.moves');
const starNodes = document.querySelectorAll('.stars li');
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
  console.log(starNodes[0].childNodes[0]);
  if(totalMoves === numGameCards){
    starNodes[2].childNodes[0].classList.remove('fa-star');
    starNodes[2].childNodes[0].classList.add('fa-star-half-o');
    starRating -= 0.5;
  }
  if(totalMoves === numGameCards * 1.25){
    starNodes[2].childNodes[0].classList.remove('fa-star-half-o');
    starNodes[2].childNodes[0].classList.add('fa-star-o');
    starRating -= 0.5;
  }
  if(totalMoves === numGameCards * 1.5){
    starNodes[1].childNodes[0].classList.remove('fa-star');
    starNodes[1].childNodes[0].classList.add('fa-star-half-o');
    starRating -= 0.5;
  }
  if(totalMoves === numGameCards * 1.75){
    starNodes[1].childNodes[0].classList.remove('fa-star-half-o');
    starNodes[1].childNodes[0].classList.add('fa-star-o');
    starRating -= 0.5;
  }
}

function playAgain(event){
  if(event.target.nodeName === 'A' || event.target.nodeName === 'I'){
    newDeck.shuffle(newDeck.cards);
    setupBoard();
  }
}

function displayGameOverModal() {
  gameOverModal.querySelector('#moveSummary').textContent = totalMoves + ' Moves';
  gameOverModal.querySelector('#starSummary').textContent = starRating;
  gameOverModal.querySelector('#starSummary').textContent += (( starRating === 1) ? ' Star' : ' Stars');
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
      totalClicks++;
    }
  }
  if(event.target.nodeName === 'I'){
    thisNode = event.target.parentNode;
    thisCard = thisNode.currentLI;
    if(!thisCard.isFlipped){
      thisNode.classList.add('open', 'show');
      thisCard.isFlipped = true;
      thisCard.numClicks++;
      totalClicks++;
    }
  }
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

function setupBoard() {
  gameBoard.innerHTML = '';
  totalMoves = 0;
  totalMovesNode.textContent = totalMoves;
  totalClicks = 0;
  correctGuesses = 0;
  starRating = 3.0;
  for(let i = 0; i < 3; i++){
    starNodes[i].removeChild(starNodes[i].childNodes[0]);
    let starI = document.createElement('i');
    starI.classList.add('fa', 'fa-star');
    starNodes[i].appendChild(starI);
  }
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
  setupBoard();
}

window.addEventListener('load', function() {
  initialize();
});