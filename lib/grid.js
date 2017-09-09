import Cell from './cell';
import { getCellLocation } from './util/util';

const WIDTH = 1680;
const HEIGHT = 968;
const NEIGHBORS = [[-1, 0],[1, 0],[0, 1],[0,-1]];
const ROWS = 48;
const COLS = 84;

class Grid {

  constructor(){
    this.grid = new Array(24);
    for(let i = 0; i < ROWS; i++){
      this.grid[i] = new Array(COLS);
    }
    this.setupGrid();
    this.handleClick = this.handleClick.bind(this);
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.render = this.render.bind(this);
    this.allBurned = this.allBurned.bind(this);
    this.burnTrees = this.burnTrees.bind(this);
    this.startBurn = this.startBurn.bind(this);
    this.collectNeighborTrees = this.collectNeighborTrees.bind(this);
    this.burningTrees = [];
    canvas.addEventListener('click', this.handleClick);
  }

  setupGrid(){
    for(let i = 0; i < ROWS; i++){
      for(let j = 0; j < COLS; j++){
        let cell = new Cell();
        this.grid[i][j] = cell;

      }
    }
  }

  handleClick(e){
    // TODO: if empty cell, instruct user to click another cell
    const clickedCell = getCellLocation([e.offsetX, e.offsetY]);
    this.burningTrees.push(clickedCell);
    this.startBurn();

  }

  handleRandomClick(){
    let randLocation = [Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)]

    while(!this.grid[randLocation[0]][randLocation[1]].tree()){
      randLocation = [Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)]
    }
    this.burningTrees.push(randLocation);
    this.startBurn();
  }

  handleResetClick(){
    for(let i = 0; i < ROWS; i++){
      for(let j = 0; j < COLS; j++){
        this.grid[i][j].growTree();
      }
    }
    this.render();
  }



  collectNeighborTrees(treeLocation){
    let originCell = this.grid[treeLocation[0]][treeLocation[1]]
    if(!originCell.empty() && !originCell.isBurnt()){
      originCell.burn();
      // this.render();
      for(let n = 0; n < NEIGHBORS.length; n++){
        let delta = NEIGHBORS[n];
        let neighborLocation = [treeLocation[0] + delta[0], treeLocation[1]+delta[1]]
        let neighborCell = this.isInBounds(neighborLocation) ? this.grid[neighborLocation[0]][neighborLocation[1]] : undefined;
        if(neighborCell && !neighborCell.isBurning() && !neighborCell.isBurnt() && neighborCell.tree()){
          // more things will occur here, probably at level of cell

          //probablility here should be util function
          if(Math.round(Math.random()) === 1){
            this.burningTrees.push(neighborLocation);
          }

        }
      }

    } else {
      //for now do nothing
      // don't change if cell is empty(maybe produce a warning)
      console.log('nothing to burn');
    }
  }

  burnTrees(){
    this.burningTrees.forEach((cell) => {
      this.grid[cell[0]][cell[1]].burn();
    });
    // this.render();
  }



  allBurned(){
    if (this.burningTrees.length > this.grid.length * this.grid[0].length) return true;
    for(let row = 0; row < this.grid.length; row++){
      for(let col = 0; col < this.grid[0].length; col++){
        if(this.grid[row][col].isBurnt()) return false;
      }
    }
    return true;
  }

  isInBounds(newLocation){
    return newLocation[0] >= 0
      && newLocation[0] < ROWS
      && newLocation[1] >= 0
      && newLocation[1] < COLS;
  }

  startBurn(){
    //this will do the animate callback
    // remove all cells from list of burningTrees
    // find their neighbors, and add them to burningTrees
    // change the cell to a burntTree
    let timer = 1;
    const that = this;
    const animate = function() {
      // user can set speed and wind may increase speed
      if(timer%4 === 0){
        let burntTrees = that.burningTrees.slice();
        that.burnTrees();
        that.render();
        that.burningTrees = [];
        while(burntTrees.length > 0){
          const burntTree = burntTrees.shift();
          that.collectNeighborTrees(burntTree);
          that.grid[burntTree[0]][burntTree[1]].burnt();
        }
        if(that.burningTrees.length === 0){
          that.render();
          return;
        }
        timer = 1;
      } else {
        timer++;
      }
      window.requestAnimationFrame(animate);
    };
    return animate();

  }


  render(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.fillStyle = '#5F3B00';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for(let j = 0; j < HEIGHT - 20; j+=20){
      for(let i = 0; i < WIDTH; i+=20){
        ctx.strokeRect(i,j,20,20);
        ctx.fillRect(i,j,20,20);
        ctx.font = this.grid[j/20][i/20].font;
        ctx.fillStyle = this.grid[j/20][i/20].color;
        ctx.fillText(this.grid[j/20][i/20].output(), i+10, j+10);
        ctx.fillStyle = '#5F3B00';
      }
    }

  }
}

export default Grid;
