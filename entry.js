import Grid from './lib/grid';

document.addEventListener('DOMContentLoaded', () => {
  const grid = new Grid();
  grid.render();
  const randomButton = document.getElementById('random-button');
  randomButton.addEventListener('click', (e) => {
    e.preventDefault();
    grid.handleRandomClick();
  });
});
