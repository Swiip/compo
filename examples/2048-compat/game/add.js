import { fourProbability } from './conf';
import { createTile } from './tile';

import { flatten } from '../../../src/utils';

export function chooseRandomTile(board, randomPosition, randomValue) {
  const emptyCells = flatten(board.map((row, rowIndex) => row.map((tile, columnIndex) => ({
    rowIndex, columnIndex, value: tile.value,
  })))).filter(tile => tile.value === 0);
  const index = ~~(randomPosition * emptyCells.length);
  const cell = emptyCells[index];
  const value = randomValue < fourProbability ? 4 : 2;
  return {
    row: cell.rowIndex,
    column: cell.columnIndex,
    value,
  };
}

export function addTile(board, rowIndex, columnIndex, value) {
  return board.map((row, r) => row.map((tile, c) => {
    if (r === rowIndex && c === columnIndex) {
      tile = createTile(value);
    }
    return tile;
  }));
}
