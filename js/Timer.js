'use strict';

const timer = document.querySelector('.timer');
let firstTime = 0;
let startVal;
let stopVal;
let i;
let functionID;
let minutes;
let seconds;
let span = document.querySelector('#timer span');

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
    }
    else {
      playI.classList.add('fa', 'fa-play');
    }
    timer.appendChild(playI);
    let span = document.createElement('span');
    timer.appendChild(span);
    span.textContent = '00:00';

    this.isPaused = !this.isPaused;

    if(!this.isPaused){
      functionID = setInterval(go, 1000);
    }
    else {
      clearInterval(functionID);
    }

    function go() {
      if(startVal === stopVal) {
        clearInterval(functionID);
      }
      startVal += i;
      minutes = parseInt(startVal / 60);
      seconds = parseInt(startVal % 60);
      console.log(minutes + ' ' + seconds);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      span.textContent = minutes + ':' + seconds;
    }
  };
};