import { times, range } from '../../../src/utils';

import { size } from './conf';
import { createTile } from './tile';

function rotateLeft(board) {
  return board.map((row, rowIndex) =>
    row.map((cell, columnIndex) =>
      board[columnIndex][size - rowIndex - 1]));
}

function moveLeft(board) {
  let changed = false;
  board = board.map((row) => {
    const currentRow = row.filter(tile => tile.value !== 0);
    return range(size).map((target) => {
      let targetTile;
      if (currentRow.length > 0) {
        targetTile = Object.assign({}, currentRow.shift());
      } else {
        targetTile = createTile();
      }
      if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
        const tile1 = targetTile;
        tile1.merged = true;
        targetTile = createTile(targetTile.value);
        targetTile.mergedTiles = [];
        targetTile.mergedTiles.push(tile1);
        const tile2 = Object.assign({}, currentRow.shift());
        tile2.merged = true;
        targetTile.value += tile2.value;
        targetTile.mergedTiles.push(tile2);
      }
      changed |= targetTile.value !== row[target].value;
      return targetTile;
    });
  });
  return { board, changed };
}

export function move(board, direction) {
  // 0 -> left, 1 -> up, 2 -> right, 3 -> down
  times(direction, () => {
    board = rotateLeft(board);
  });
  const moveResult = moveLeft(board);
  board = moveResult.board; // eslint-disable-line prefer-destructuring
  times(4 - direction, () => {
    board = rotateLeft(board);
  });
  return { board, changed: moveResult.changed };
}
