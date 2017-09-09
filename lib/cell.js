/**
** Cell states
**/
const BURNING = 'b';
const EMPTY = 'e';
const BURNT = 'B';
const TREE = 't';




class Cell {
  constructor(){
    let rand = Math.ceil(Math.random()*3);
    this.color = 'green';
    this.font = '15px sans-serif';
    if(rand <= 2){
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
    this.color = '#D74915';
  }

  burnt(){
    this.text = "\uD83C\uDF32";
    this.status = BURNT;
    this.color = 'black';
    this.font = '5px sans-serif';
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

  growTree(){
    if(this.isBurnt()){
      this.status = TREE;
      this.text = "\uD83C\uDF32";
      this.color = 'green';
      this.font = '15px sans-serif';
    }
  }
}

export default Cell;
