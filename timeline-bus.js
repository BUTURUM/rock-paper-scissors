const timelineBus = new EventTarget();

timelineBus.addEventListener('start-battle', () => {
  setTimeout(() => timelineBus.dispatchEvent(new CustomEvent('stop-battle')), 2300);
});

export default timelineBus;