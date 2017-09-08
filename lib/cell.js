
/**
** Cell has the folowing:
** status: burning, empty, burnt, tree (b, e, B, t)
** color(to make it easy to render)
** corresponding text(have a method to calculate that?)
**/
const BURNING = 'b';
const EMPTY = 'e';
const BURNT = 'B';
const TREE = 't';




class Cell {
  constructor(){
    // Cell will know:
    // what it contains
    // It's status(burned, burning, tree, empty)
    let rand = Math.ceil(Math.random()*2);
    if(rand === 2){
      this.status = 't';
      this.text = "\uD83C\uDF32";
    } else {
      this.status = EMPTY;
      this.text = '';
    }
  }

  burn(){
    this.text = '\ud83d\udd25'; // should also set text somewhere, or just use that as status
    this.status = BURNING;
  }

  burnt(){
    this.text = '\uD83E\uDD40';
    this.status = BURNT;
  }

  empty(){
    return this.status === EMPTY;
  }


  isBurning(){
    return this.status === BURNING;
  }

  isBurnt(){
    return this.status === BURNT;
  }

  tree(){
    return this.status === TREE;
  }

  output(){
    return this.text;
  }
}

export default Cell;
