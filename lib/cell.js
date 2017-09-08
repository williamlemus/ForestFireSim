
/**
** Cell has the folowing:
** status: burning, empty, burnt, tree
** color(to make it easy to render)
** corresponding text(have a method to calculate that?)
**/
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
      this.status = 'e';
      this.text = '';
    }
  }



}
