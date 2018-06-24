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

let totalMoves = 0;
let correctGuesses = 0;
let starRating = 3;

function respondToImageClick(event){
  if(event.target.nodeName === 'LI'){
    if(!event.target.currentLI.isFlipped){
      event.target.classList.add('open', 'show');
      event.target.currentLI.isFlipped = true;
      event.target.currentLI.numClicks++;
      totalMoves++;
    }
  }
  if(event.target.nodeName === 'I'){
    if(!event.target.parentNode.currentLI.isFlipped){
      event.target.parentNode.classList.add('open', 'show');
      event.target.parentNode.currentLI.isFlipped = true;
      event.target.parentNode.currentLI.numClicks++;
      totalMoves++;
    }
  }
}

function setupBoard(numCards) {
  let gameBoard = document.querySelector('.deck');
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
initialize(16);