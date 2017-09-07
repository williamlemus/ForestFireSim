const WIDTH = 840;
const HEIGHT = 484;

class Grid {

  constructor(){
    this.grid = new Array(24);
    for(let i = 0; i < 24; i++){
      this.grid[i] = new Array(42);
    }
    this.setupGrid();
    this.handleClick = this.handleClick.bind(this);
    canvas.addEventListener('click', this.handleClick);
  }

  setupGrid(){
    // will have cells soon!
    for(let i = 0; i < 24; i++){
      for(let j = 0; j < 42; j++){
        let rand = Math.ceil(Math.random()*2)
        this.grid[i][j] = rand===2 ? "\uD83C\uDF32" : "";
      }
    }
  }

  handleClick(e){
    // change things to other colors
    const clickedCell = getCell([e.offsetX, e.offsetY]);

    this.grid[clickedCell[1]][clickedCell[0]] = "";
    // instead grid will do things.
    this.render();
  }

  render(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.fillStyle = '#5F3B00';
    ctx.font = '15px sans-serif'; //must specify font-type also!
    ctx.textBaseline = 'middle';
    for(let j = 0; j < HEIGHT - 20; j+=20){
      for(let i = 0; i < WIDTH; i+=20){
        ctx.strokeRect(i,j,20,20);
        ctx.fillRect(i,j,20,20);
        ctx.fillStyle = 'green';
        ctx.fillText(this.grid[j/20][i/20], i, j + 10);
        ctx.fillStyle = '#5F3B00';
      }
    }
    //e.x , e.y will tell you what point it is.

  }
}

//
// export default Grid;
