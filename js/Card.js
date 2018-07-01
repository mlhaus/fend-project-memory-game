'use strict';

/**
 * Represents a card
 * @constructor
 * @param {string} symbol - A font awesome symbol
 */
let Card = function(symbol) {
  this.symbol = symbol;
  this.isFlipped = false;
  this.numClicks = 0;
};