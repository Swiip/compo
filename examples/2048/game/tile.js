let tileId = 0;

export function createTile(value, row, column) {
  tileId += 1;

  return {
    id: tileId,
    value: value || 0,
    row: row || -1,
    column: column || -1,
    oldRow: -1,
    oldColumn: -1,
  };
}

export function isNew(tile) {
  return tile.oldRow === -1;
}

export function hasMoved(tile) {
  return (
    tile.oldRow !== -1 &&
    (tile.oldRow !== tile.row || tile.oldColumn !== tile.column)
  );
}

function updatePositions(tile, row, column) {
  return Object.assign({}, tile, {
    oldRow: tile.row,
    oldColumn: tile.column,
    row,
    column,
  });
}

export function update(board) {
  return board.map((row, rowIndex) => row.map((tile, columnIndex) => {
    tile = updatePositions(tile, rowIndex, columnIndex);
    if (tile.mergedTiles) {
      tile.mergedTiles = tile.mergedTiles.map(mergedTile =>
        updatePositions(mergedTile, rowIndex, columnIndex));
    }
    return tile;
  }));
}
