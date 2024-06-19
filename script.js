const actionBus = new EventTarget();

const actionPanel = document.getElementById('action-panel');

function lockActionPanel(){
  for(let i = 0; i < actionPanel.children.length; i++){
    actionPanel.children[i].disabled = true;
  }
}

function resetActionPanel(){
  for(let i = 0; i < actionPanel.children.length; i++){
    actionPanel.children[i].classList.remove('selected');
    actionPanel.children[i].disabled = false;
  }
}

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