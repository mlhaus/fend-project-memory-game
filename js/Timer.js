'use strict';

const timer = document.querySelector('.timer');
let firstTime = 0;
let startVal;
let stopVal;
let i;
let functionID;

let Timer = function(startVal, stopVal = 9999999) {
  this.startValue = startVal;
  this.stopValue = stopVal;
  this.increment = ((startVal < stopVal) ? 1 : -1);
  this.isPaused = true;
  this.startPause = function() {
    if(firstTime === 0){
      startVal = this.startValue;
      stopVal = this.stopValue;
      i = this.increment;
    }
    timer.innerHTML = '';
    let playI = document.createElement('i');
    if(this.isPaused){
      playI.classList.add('fa', 'fa-pause');
      functionID = setInterval(go, 1000);
    }
    else {
      playI.classList.add('fa', 'fa-play');
      clearInterval(functionID);
    }
    timer.appendChild(playI);
    this.isPaused = !this.isPaused;

    let span = document.createElement('span');
    span.textContent = '00:00:00';
    timer.appendChild(span);
    
    function go() {
      if(startVal === stopVal) {
        clearInterval(functionID);
      }
      console.log(startVal);
      startVal += i;
    }
  };
};