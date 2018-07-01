'use strict';

const timer = document.querySelector('.timer');

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
    timer.innerHTML = '';
    let playI = document.createElement('i');
    playI.classList.add('fa', 'fa-play');
    if(this.isPaused){
      playI.classList.remove('fa', 'fa-play');
      playI.classList.add('fa', 'fa-pause');
    }
    timer.appendChild(playI);
    let span = document.createElement('span');
    timer.appendChild(span);
    instance.minutes = parseInt(instance.startValue / 60);
    instance.seconds = parseInt(instance.startValue % 60);
    instance.minutes = instance.minutes < 10 ? '0' + instance.minutes : instance.minutes;
    instance.seconds = instance.seconds < 10 ? '0' + instance.seconds : instance.seconds;
    span.textContent = instance.minutes + ':' + instance.seconds;
    instance.isPaused = !instance.isPaused;

    if(!this.isPaused){
      instance.functionID = setInterval(go, 1000);
    }
    else {
      clearInterval(instance.functionID);
    }

    function go() {
      instance.startValue += instance.increment;
      if(instance.startValue === instance.stopValue) {
        clearInterval(instance.functionID);
      }
      instance.minutes = parseInt(instance.startValue / 60);
      instance.seconds = parseInt(instance.startValue % 60);
      instance.minutes = instance.minutes < 10 ? '0' + instance.minutes : instance.minutes;
      instance.seconds = instance.seconds < 10 ? '0' + instance.seconds : instance.seconds;
      span.textContent = instance.minutes + ':' + instance.seconds;
    }
  };
};