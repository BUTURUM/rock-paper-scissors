import timelineBus from "./timeline-bus.js";

export const actionBus = new EventTarget();

const pictures = {
  rock: new Image(), scissors: new Image(), paper: new Image()
}
pictures.rock.src = 'icons/rock-hand.svg';
pictures.scissors.src = 'icons/scissors-hand.svg';
pictures.paper.src = 'icons/paper-hand.svg';

const actionPanel = document.getElementById('action-panel');
const playButton = document.getElementById('play-button');
const leftHand = document.querySelector('.hand-box.left');
const rightHand = document.querySelector('.hand-box.right');
const logTitle = document.getElementById('log-title');
const yourScore = document.querySelector('.score-box.left > .score-count');
const opponentScore = document.querySelector('.score-box.right > .score-count');

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

export function logOutcome(outcome){
  logTitle.innerText = outcome;
}

function changeHand(el, hand){
  if(hand){
    el.replaceChildren(pictures[hand].cloneNode());
  } else{
    el.replaceChildren(pictures.rock.cloneNode());
  }
}
export const changeLeftHand = (hand) => changeHand(leftHand, hand);
export const changeRightHand = (hand) => changeHand(rightHand, hand);

export const updateYourScore = (newScore) => yourScore.innerText = newScore;
export const updateOpponentScore = (newScore) => opponentScore.innerText = newScore;

actionPanel.addEventListener('click', (event) => {
  if(event.target.tagName !== 'BUTTON'){
    return
  }
  lockActionPanel();
  event.target.classList.add('selected');

  actionBus.dispatchEvent(new CustomEvent('hand-chosen', {
    detail: {hand: event.target.getAttribute('data-hand')}
  }));
});

playButton.addEventListener('click', () => {
  timelineBus.dispatchEvent(new CustomEvent('start-battle'));
});

timelineBus.addEventListener('start-battle', () => {
  logTitle.innerText = '';

  leftHand.replaceChildren(pictures.rock.cloneNode());
  rightHand.replaceChildren(pictures.rock.cloneNode());

  leftHand.classList.add('shaking');
  rightHand.classList.add('shaking');

  resetActionPanel();

  playButton.hidden = true;
});
timelineBus.addEventListener('stop-battle', () => {
  leftHand.classList.remove('shaking');
  rightHand.classList.remove('shaking');

  lockActionPanel();
  
  playButton.hidden = false;
});