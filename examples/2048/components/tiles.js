import {
  component,
  withMarkup,
  withStore,
  html,
} from '../../..';

import './tile';

component(
  'swiip-tiles',
  withStore(({ getState }) => {
    const { board } = getState();
    const tiles = [];

    if (!board) {
      return tiles;
    }

    board.forEach((rows) => {
      rows.forEach((cell) => {
        if (cell.value > 0) {
          tiles.push(cell);
        }
        if (Array.isArray(cell.mergedTiles)) {
          tiles.push(...cell.mergedTiles);
        }
      });
    });

    return { tiles };
  }),
  withMarkup(({ tiles = [] }) => html`
    <div>
      ${tiles.map(tile => html`
        <swiip-tile key=${tile.id} tile=${tile}>
          ${tile.value}
        </swiip-tile>
      `)}
    </div>
  `),
);
