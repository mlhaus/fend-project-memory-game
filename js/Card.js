'use strict';

let Card = function(symbol) {
  this.symbol = symbol;
  this.isFlipped = false;
  this.numClicks = 0;
};