import {
  actionBus, changeLeftHand, changeRightHand, logOutcome, updateOpponentScore, updateYourScore
} from './interface.js';
import timelineBus from './timeline-bus.js';

let userHandChoice = null;
let playerScore = 0;
let computerScore = 0;

function choseRandomHand(){
  const handSequence = ['rock', 'paper', 'scissors'];
  return handSequence[Math.floor(Math.random() * handSequence.length)];
}

function determineOutcome(yourHandChoice, enemyHandChoice){
  if(yourHandChoice === enemyHandChoice){
    return 'draw';
  }
  switch(enemyHandChoice){
    case 'rock':
      if(yourHandChoice === 'paper') return 'victory';
      break
    case 'paper':
      if(yourHandChoice === 'scissors') return 'victory';
      break
    case 'scissors':
      if(yourHandChoice === 'rock') return 'victory';
  }
  return 'defeat';
}

actionBus.addEventListener('hand-chosen', () => {
  userHandChoice = event.detail.hand;
});

timelineBus.addEventListener('start-battle', () => {
  userHandChoice = null;
});
timelineBus.addEventListener('stop-battle', () => {
  let computerHandChoice = choseRandomHand();
  changeRightHand(computerHandChoice);

  if(userHandChoice){
    let outcome = determineOutcome(userHandChoice, computerHandChoice);
    changeLeftHand(userHandChoice);
    switch(outcome){
      case 'victory':
        logOutcome('You win!');
        playerScore += 1;
        break
      case 'defeat':
        logOutcome('You lose!');
        computerScore += 1;
        break
      case 'draw':
        logOutcome('It is draw!');
        break
    }
  } else{
    logOutcome("You didn't chose hand!");
    computerHandChoice += 1;
  }
  
  updateOpponentScore(computerHandChoice);
  updateYourScore(playerScore);
});