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
    this.render = this.render.bind(this);
    this.allBurned = this.allBurned.bind(this);
    this.burnTrees = this.burnTrees.bind(this);
    this.startBurn = this.startBurn.bind(this);
    this.collectNeighborTrees = this.collectNeighborTrees.bind(this);
    this.burningTrees = [];
    canvas.addEventListener('click', this.handleClick);
  }

  setupGrid(){
    // will have cells soon!
    for(let i = 0; i < ROWS; i++){
      for(let j = 0; j < COLS; j++){
        //Create new cell
        let cell = new Cell();
        this.grid[i][j] = cell;

      }
    }
  }

  handleClick(e){
    // change things to other colors
    const clickedCell = getCellLocation([e.offsetX, e.offsetY]);
    this.burningTrees.push(clickedCell);
    this.startBurn();

  }


  collectNeighborTrees(treeLocation){
    // this change will be handled inside of the cell itself
    let originCell = this.grid[treeLocation[0]][treeLocation[1]]
    if(!originCell.empty() && !originCell.isBurnt()){
      originCell.burn();

      // need to bounds check
      for(let n = 0; n < NEIGHBORS.length; n++){
        let delta = NEIGHBORS[n];
        let neighborLocation = [treeLocation[0] + delta[0], treeLocation[1]+delta[1]]
        let neighborCell = this.isInBounds(neighborLocation) ? this.grid[neighborLocation[0]][neighborLocation[1]] : undefined;
        if(neighborCell && !neighborCell.isBurning() && !neighborCell.isBurnt() && neighborCell.tree()){ 
          // more things will occur here, probably at level of cell
          // instead grid will do things.

          //probablility here
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
    // TODO: Make this check prettier
    return newLocation[0] >= 0 && newLocation[0] < ROWS && newLocation[1] >= 0 && newLocation[1] < COLS;
  }

  startBurn(){
    //this will do the animate callback
    // remove all trees from list of trees
    // find their neighbors, and add them to burningTrees
    // change the tree to a burntTree
      let burntTrees = this.burningTrees.slice();
      this.burnTrees();
      this.render();
      this.burningTrees = [];
      while(burntTrees.length > 0){
        const burntTree = burntTrees.shift();
        this.collectNeighborTrees(burntTree);
        this.grid[burntTree[0]][burntTree[1]].burnt();
        // make it burnt tree

      }
      if(this.burningTrees.length === 0){
        this.render();
        return;
      }
      window.requestAnimationFrame(this.startBurn);

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
        // this color will depend on what is being rendered
        ctx.fillStyle = 'green';
        ctx.fillText(this.grid[j/20][i/20].output(), i, j + 10);
        ctx.fillStyle = '#5F3B00';
      }
    }
    //e.x , e.y will tell you what point it is.
    // might have to give it more of a pause

  }
}

export default Grid;
