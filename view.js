export const eventBus = new EventTarget();

const pictures = {
  rock: new Image(), scissors: new Image(), paper: new Image()
}
pictures.rock.src = 'icons/rock-hand.svg';
pictures.scissors.src = 'icons/scissors-hand.svg';
pictures.paper.src = 'icons/paper-hand.svg';

const
  actionPanel = document.getElementById('action-panel'),
  playButton = document.getElementById('play-button');
const
  leftHand = document.querySelector('.hand-box.left'),
  rightHand = document.querySelector('.hand-box.right'),
  logTitle = document.getElementById('log-title'),
  yourScoreCount = document.querySelector('.score-box.left > .score-count'),
  opponentScoreCount = document.querySelector('.score-box.right > .score-count');

leftHand.append(pictures.rock.cloneNode());
rightHand.append(pictures.rock.cloneNode());

function lockActionPanel(){
  for(let i = 0; i < actionPanel.children.length; i++){
    actionPanel.children[i].disabled = true;
  }
}
lockActionPanel();

function resetActionPanel(){
  for(let i = 0; i < actionPanel.children.length; i++){
    actionPanel.children[i].classList.remove('selected');
    actionPanel.children[i].disabled = false;
  }
}

function changeHand(el, hand){
  if(hand){
    el.replaceChildren(pictures[hand].cloneNode());
  } else{
    el.replaceChildren(pictures.rock.cloneNode());
  }
}
export const changeUserHand = (hand) => changeHand(leftHand, hand);
export const changeComputerHand = (hand) => changeHand(rightHand, hand);

export function logOutcome(outcome, userScore, computerScore){
  switch(outcome){
    case 'victory':
      logTitle.innerText = 'You won!';
      break
    case 'defeat':
      logTitle.innerText = 'You lost!';
      break
    case 'draw':
      logTitle.innerText = 'It is draw!';
      break
    default:
      logTitle.innerText = "You haven't chosen hand!";
      break
  }
  yourScoreCount.innerText = userScore;
  opponentScoreCount.innerText = computerScore;
}

actionPanel.addEventListener('click', (event) => {
  if(!event.target.hasAttribute('data-hand')){
    return
  }

  lockActionPanel();
  event.target.classList.add('selected');

  eventBus.dispatchEvent(new CustomEvent('chose-hand', {
    detail: {hand: event.target.getAttribute('data-hand')}
  }))
});
playButton.addEventListener('click', (event) => {
  setTimeout(() => {
    eventBus.dispatchEvent(new CustomEvent('stop-round'));
  }, 2300);
  eventBus.dispatchEvent(new CustomEvent('start-round'));
});

eventBus.addEventListener('start-round', () => {
  logTitle.innerText = '';

  changeUserHand(); changeComputerHand();

  leftHand.classList.add('shaking');
  rightHand.classList.add('shaking');

  resetActionPanel();

  playButton.hidden = true;
});
eventBus.addEventListener('stop-round', () => {
  leftHand.classList.remove('shaking');
  rightHand.classList.remove('shaking');

  lockActionPanel();
  
  playButton.hidden = false;
});