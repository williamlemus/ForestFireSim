import {CELL_SIZE } from '../grid';
const NORTH = 'North'
const SOUTH = 'South'
const EAST = 'East'
const WEST = 'West'

export const getCellLocation = location => {
  return [Math.floor(location[1]/CELL_SIZE), Math.floor(location[0]/CELL_SIZE)];
};


export const calculateProbability = (direction, delta, probablility) => {
  switch(direction){
    case NORTH:
      return delta[0] === -1 ? probablility * 1.5 : probablility * .5;
    case SOUTH:
      return delta[0] === 1 ? probablility * 1.5 : probablility * .5;
    case EAST:
      return delta[1] === -1 ? probablility * 1.5 : probablility * .5;
    case WEST:
      return delta[1] === 1 ? probablility * 1.5 : probablility * .5;
    default:
      return probablility;
  }
};
