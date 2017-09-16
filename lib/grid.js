import Cell from './cell';
import { getCellLocation, calculateProbability } from './util/util';

const WIDTH = 1530;
const HEIGHT = 750;
const NEIGHBORS = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0] ];
const ROWS = 50;
const COLS = 102;
export const CELL_SIZE = 15;

class Grid {

  constructor(){
    this.grid = new Array(ROWS);
    for(let i = 0; i < ROWS; i++){
      this.grid[i] = new Array(COLS);
    }
    this.totalTreeCount = 0;
    this.setupGrid();
    this.handleClick = this.handleClick.bind(this);
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.render = this.render.bind(this);
    this.burnTrees = this.burnTrees.bind(this);
    this.startBurn = this.startBurn.bind(this);
    this.getPreferences = this.getPreferences.bind(this);
    this.collectNeighborTrees = this.collectNeighborTrees.bind(this);
    this.burningTrees = [];
    this.probablility = 50;
    this.windDirection = '';
    this.numBurntTrees = 0;
    canvas.addEventListener('click', this.handleClick);
  }

  setupGrid(){
    for(let i = 0; i < ROWS; i++){
      for(let j = 0; j < COLS; j++){
        let cell = new Cell();
        this.grid[i][j] = cell;
        if(cell.tree()) ++this.totalTreeCount;
      }
    }
  }

  getPreferences(){
    const probablility = document.getElementById('probablility');
    if(probablility.value !== "") this.probablility = probablility.value;
    this.windDirection = document.getElementById('wind-direction').value;
  }

  handleClick(e){
    // TODO: if empty cell, instruct user to click another cell
    this.getPreferences();

    const clickedCell = getCellLocation([e.offsetX, e.offsetY]);
    this.burningTrees.push(clickedCell);
    this.startBurn();

  }

  handleRandomClick(){
    let randLocation = [Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)]
    this.getPreferences();
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
    this.numBurntTrees = 0;
    const burned = document.getElementById('num-burned');
    burned.innerText = this.numBurntTrees;
    const remaining = document.getElementById('forest-remaining');
    remaining.innerText = 100 - Math.round(100*this.numBurntTrees/this.totalTreeCount);
    this.render();
  }



  collectNeighborTrees(treeLocation){
    let originCell = this.grid[treeLocation[0]][treeLocation[1]]
    if(!originCell.empty() && !originCell.isBurnt()){
      for(let n = 0; n < NEIGHBORS.length; n++){
        let delta = NEIGHBORS[n];
        let neighborLocation = [treeLocation[0] + delta[0], treeLocation[1]+delta[1]]
        let neighborCell = this.isInBounds(neighborLocation) ? this.grid[neighborLocation[0]][neighborLocation[1]] : undefined;
        if(neighborCell && !neighborCell.isBurning() && !neighborCell.isBurnt() && neighborCell.tree()){
          // more things will occur here, probably at level of cell

          //probablility here should be util function
          if(Math.random() <= calculateProbability(this.windDirection, delta, this.probablility)/100){
            //only add if its not in list
            if(this.burningTrees.every((el) => !(el[0] === neighborLocation[0] && el[1] === neighborLocation[1])))
            {
              this.burningTrees.push(neighborLocation);
            }
          }

        }
      }

    } else {
      //for now do nothing
      // don't change if cell is empty(maybe produce a warning)
    }
  }


  burnTrees(){
    this.burningTrees.forEach((cell) => {
      this.grid[cell[0]][cell[1]].burn();
    });
    this.numBurntTrees += this.burningTrees.length;
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
        if(that.windDirection !== 'None'){
          timer += 2;
        }
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
    for(let j = 0; j < HEIGHT; j+=CELL_SIZE){
      for(let i = 0; i < WIDTH; i+=CELL_SIZE){
        ctx.strokeRect(i,j,CELL_SIZE,CELL_SIZE);
        ctx.fillRect(i,j,CELL_SIZE,CELL_SIZE);
        ctx.font = this.grid[j/CELL_SIZE][i/CELL_SIZE].font;
        ctx.fillStyle = this.grid[j/CELL_SIZE][i/CELL_SIZE].color;
        ctx.fillText(this.grid[j/CELL_SIZE][i/CELL_SIZE].output(), i+7, j+10);
        ctx.fillStyle = '#5F3B00';
      }
    }
    const burned = document.getElementById('num-burned');
    burned.innerText = this.numBurntTrees;
    const remaining = document.getElementById('forest-remaining');
    remaining.innerText = 100 - Math.round(100*this.numBurntTrees/this.totalTreeCount);

  }
}

export default Grid;
