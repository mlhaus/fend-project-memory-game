'use strict';

const timer = document.querySelector('.timer');

/**
 * Represents a timer.
 * @constructor
 * @param {number} startVal - number of seconds where timer starts
 * @param {number} stopVal - number of secodns when timer stops
 */
let Timer = function(startVal, stopVal) {
  this.startValue = startVal;
  this.stopValue = stopVal;
  this.increment = ((startVal < stopVal) ? 1 : -1);
  this.isPaused = true;
  this.functionID = 0;
  this.minutes = 0;
  this.seconds = 0;
  let instance = this;
  this.startPause = function() {
    /** Adds a play or pause button */
    timer.innerHTML = '';
    let playI = document.createElement('i');
    playI.classList.add('fa', 'fa-play');
    if(instance.isPaused){
      playI.classList.remove('fa', 'fa-play');
      playI.classList.add('fa', 'fa-pause');
    }
    timer.appendChild(playI);

    /** Displays the starting time */
    let span = document.createElement('span');
    timer.appendChild(span);
    instance.minutes = parseInt(instance.startValue / 60);
    instance.seconds = parseInt(instance.startValue % 60);
    instance.minutes = instance.minutes < 10 ? '0' + instance.minutes : instance.minutes;
    instance.seconds = instance.seconds < 10 ? '0' + instance.seconds : instance.seconds;
    span.textContent = instance.minutes + ':' + instance.seconds;

    /** Toggles isPaused variable each time the play/paused button is clicked */
    instance.isPaused = !instance.isPaused;

    /** Starts the timer when it's not paused. Stops it when it is paused. */
    if(!instance.isPaused){
      instance.functionID = setInterval(go, 1000);
    }
    else {
      clearInterval(instance.functionID);
    }


    function go() {
      instance.startValue += instance.increment; // Will add or substract 1

      /** Stops timer when the startValue reaches the stopValue */
      if(instance.startValue === instance.stopValue) {
        clearInterval(instance.functionID);
      }

      /** Displays the updated time every 1000 ms */
      instance.minutes = parseInt(instance.startValue / 60);
      instance.seconds = parseInt(instance.startValue % 60);
      instance.minutes = instance.minutes < 10 ? '0' + instance.minutes : instance.minutes;
      instance.seconds = instance.seconds < 10 ? '0' + instance.seconds : instance.seconds;
      span.textContent = instance.minutes + ':' + instance.seconds;
    }
  };
};