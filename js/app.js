/* globals Card, Deck, Timer */
'use strict';

let newDeck = new Deck(); // Used in initalize, setupBoard and startNewGame functions
const timerStart = 0; // Used to create t1 object and in startNewGame function
const timerEnd = 300; // 5 minutes
let t1 = new Timer(timerStart, timerEnd); // Used in setupBoard, startNewGame, startPause, displayGameOverModal
const numGameCards = 16; // Used in initalize, setupBoard, gameOver amd updateStars
const gameBoard = document.querySelector('.deck'); // Used in initalize and setupBoard functions
const gameOverModal = document.getElementById('gameOverModal');   // Used in setupBoard and displayGameOverModal functions
const totalMovesNode = document.querySelector('.moves'); // Used in setupBoard and respondToImageClick functions
const starNodes = document.querySelector('.stars'); // Used in setupBoard and updateStars functions
let totalMoves = 0; // Used in setupBoard, respondToImageClick, displayGameOverModal, updateStars functions
let totalClicks = 0; // Used in setupBoard and respondToImageClick functions
let correctGuesses = 0; // Used in setupBoard, doCardsMatch and gameOver functions
let starRating = 3.0; // Used in setupBoard, displayGameOverModal and updateStars functions
let thisCard; // Used in respondToImageClick function
let card1;
let card2;
let thisNode;
let node1;
let node2;

/**
 * Removes a half star for too many moves.
 * Example: If there are 16 stars, 16 moves will result in 2.5 stars,
 *   20 moves will result in 2 stars, 24 moves will result in 1.5 stars,
 *   28 or more moves will result in 1 star.
 *   Calculation is based on numGameCards variable on line 8.
 */
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

/**
 * When a new game is started, the timer will reset to it's original value (see lines 5 and 6),
 *   the deck of cards will be shuffled, and will be placed on the board.
 */
function startNewGame() {
  t1.startValue = timerStart;
  t1.stopValue = timerEnd;
  t1.isPaused = false;
  t1.startPause();
  newDeck.shuffle(newDeck.cards);
  setupBoard();
}

/**
 * New game is created when the 'Play Again' button is clicked on the gameOverModal
 *   or when the restart icon is clicked
 * @param {*} event
 */
function playAgain(event){
  if(event.target.nodeName === 'A' || event.target.nodeName === 'I'){
    startNewGame();
  }
}

/**
 * Game is paused when the pause icon or timer text is clicked.
 * @param {*} event
 */
function startPause(event){
  if(event.target.nodeName === 'I' || event.target.nodeName === 'SPAN'){
    t1.startPause();
  }
}

/**
 * Pauses the timer and unhides the gameOverModal after updating the text.
 */
function displayGameOverModal() {
  t1.startPause();
  gameOverModal.querySelector('#moveSummary').textContent = totalMoves + ' Moves';
  gameOverModal.querySelector('#starSummary').textContent = starRating;
  gameOverModal.querySelector('#starSummary').textContent += (( starRating === 1) ? ' Star' : ' Stars');
  gameOverModal.querySelector('#timeSummary').textContent = t1.minutes + ':' + t1.seconds;
  gameOverModal.classList.remove('hidden');
  gameOverModal.querySelector('a').addEventListener('click', startNewGame);
}

/**
 * Game is over when the number of correct guesses equals half of the number of cards.
 * Example: If there are 16 cards, the game is over when the player makes 8 correct guesses.
 */
function gameOver() {
  return correctGuesses === numGameCards / 2;
}

/**
 * Compares the symbols of the two most recently clicked cards
 * @param {Card} c1 - The first card clicked
 * @param {Card} c2 - The second card clicked
 * @param {Card} n1 - The first node to update
 * @param {Card} n2 - The second node to update
 */
function doCardsMatch(c1, c2, n1, n2) {
  /** Will hide the cards after 1 second */
  setTimeout(function(){
    n1.classList.remove('open', 'show');
    n2.classList.remove('open', 'show');
  }, 1000);

  /** Will change card colors to green when a match is found and check if the all cards have been clicked */
  if(c1.symbol === c2.symbol) {
    n1.classList.add('match');
    n2.classList.add('match');
    correctGuesses++;
    if(gameOver()) {
      displayGameOverModal();
    }
  }
  // Will change the cards back to their unflipped state if they're not a match
  else {
    c1.isFlipped = false;
    c2.isFlipped = false;
  }
}

/**
 * Checks if a user clicks the box (LI) or symbol icon (I)
 * @param {*} event 
 */
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

    /** Sets the card color to blue when clicked */
    if(!thisCard.isFlipped){
      thisNode.classList.add('open', 'show');
      thisCard.isFlipped = true;
      thisCard.numClicks++;

      /** totalClicks keeps track if the user has clicked the first or second card.
       *    Updates moves, stars and checks for equality after the second card is clicked */
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

/**
 * Resets the game settings to their original state
 */
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

/**
 * Creates cards based on the numGameCards variable on line 8.
 * Adds the cards to a deck and shuffles the deck.
 * Creates 3 event listeners for the game board, reset button and pause button.
 */
function initialize() {
  let cardImages = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb']; // Needs more icons if the numGameCards variable on line 8 increases.
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