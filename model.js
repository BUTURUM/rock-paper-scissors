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

const model = {
  resetHand(){
    this.user.handChoice = null;
    this.computer.handChoice = null;
  },
  choseHand(hand){
    this.user.handChoice = hand;
  },
  play(){
    let outcome = null;
    this.computer.handChoice = choseRandomHand();
  
    if(this.user.handChoice){
      outcome = determineOutcome(this.user.handChoice, this.computer.handChoice);
      if(outcome === 'victory'){
        this.user.score++;
      }
      if(outcome === 'defeat'){
        this.computer.score++;
      }
    } else{
      this.computer.score++;
    }
    return outcome;
  },
  user: {
    score: 0, handChoice: null
  },
  computer: {
    score: 0, handChoice: null
  },
  round: 0
};
export default model;