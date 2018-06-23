'use strict';

let Card = function(symbol) {
  this.symbol = symbol;
  this.isFlipped = false;
  this.isClickable = true;
  this.numClicks = 0;
};