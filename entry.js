import Grid from './lib/grid';

document.addEventListener('DOMContentLoaded', () => {
  const grid = new Grid();
  grid.render();
  const randomButton = document.getElementById('random-button');
  const resetButton = document.getElementById('reset-button');
  randomButton.addEventListener('click', (e) => {
    e.preventDefault();
    grid.handleRandomClick();
  });
  resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    grid.handleResetClick();
  });
});
