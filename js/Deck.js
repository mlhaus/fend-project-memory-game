'use strict';

/**
 * Represents a deck of cards.
 * @constructor
 */
let Deck = function() {
  this.cards = [];
  /** 
   * Shuffle function from http://stackoverflow.com/a/2450976
   * @returns {array} - The cards array shuffled in a random order 
   * */
  this.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };
};