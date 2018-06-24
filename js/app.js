/* globals Card, Deck */
'use strict';

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const numGameCards = 16;
const gameBoard = document.querySelector('.deck');
let totalMoves = 0;
let correctGuesses = 0;
let starRating = 3;
let thisCard;
let card1;
let card2;
let thisNode;
let node1;
let node2;
let gameOver = false;

function isGameOver() {
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
    gameOver = isGameOver();
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

function setupBoard(numCards) {
  gameBoard.addEventListener('click', respondToImageClick);
  gameBoard.innerHTML = '';
  totalMoves = 0;
  correctGuesses = 0;
  starRating = 3;
  for(let i = 0; i < numCards; i++){
    let cardLI = document.createElement('li');
    cardLI.currentLI = newDeck.cards[i];
    cardLI.classList.add('card'); // Add  'open' and 'show' to the argument list to preview the cards
    let cardSymbol = document.createElement('i');
    cardSymbol.classList.add('fa', 'fa-' + newDeck.cards[i].symbol);
    cardLI.appendChild(cardSymbol);
    gameBoard.appendChild(cardLI);
  }
}

function initialize(numCards) {
  let cardImages = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
  for(let i = 0; i < numCards; i++){
    let newCard = new Card(cardImages[i % (numCards / 2)]);
    newDeck.cards.push(newCard);
  }
  newDeck.shuffle(newDeck.cards);
  setupBoard(numCards);
}
let newDeck = new Deck();
initialize(numGameCards);