import {eventBus, logOutcome, changeComputerHand, changeUserHand} from "./view.js";
import model from "./model.js";

eventBus.addEventListener('chose-hand', (event) => {
  model.choseHand(event.detail.hand)
});
eventBus.addEventListener('start-round', () => model.resetHand());

eventBus.addEventListener('stop-round', () => {
  changeUserHand(model.user.handChoice);
  changeComputerHand(model.computer.handChoice);

  let outcome = model.play();
  logOutcome(outcome, model.user.score, model.computer.score);
});