import {CELL_SIZE } from '../grid';

export const getCellLocation = location => {
  return [Math.floor(location[1]/CELL_SIZE), Math.floor(location[0]/CELL_SIZE)];
}
