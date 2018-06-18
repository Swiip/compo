import { component, withProp, withStyle, css } from '../../..';

const tileParams = [
  null,
  {
    color: 'inherit',
    background: '#eee4da',
    font: '55px',
  },
  {
    color: 'inherit',
    background: '#ede0c8',
    font: '55px',
  },
  {
    color: '#f9f6f2',
    background: '#f2b179',
    font: '55px',
  },
  {
    color: '#f9f6f2',
    background: '#f59563',
    font: '55px',
  },
  {
    color: '#f9f6f2',
    background: '#f67c5f',
    font: '55px',
  },
  {
    color: '#f9f6f2',
    background: '#f65e3b',
    font: '55px',
  },
  {
    color: '#f9f6f2',
    background: '#edcf72',
    font: '45px',
  },
  {
    color: '#f9f6f2',
    background: '#edcc61',
    font: '45px',
  },
  {
    color: '#f9f6f2',
    background: '#edc850',
    font: '45px',
  },
  {
    color: '#f9f6f2',
    background: '#edc53f',
    font: '35px',
  },
  {
    color: '#f9f6f2',
    background: '#edc22e',
    font: '35px',
  },
];

const param = tile => tileParams[Math.log2(tile.value)];

component(
  'swiip-tile',
  withProp('tile'),
  withStyle(({ tile }) => tile && css`
    :host {
      position: absolute;
      height: 100px;
      width: 100px;
      border-radius: 3px;
      z-index: 10;
      font-weight: bold;
      font-size: 55px;
      display: flex;
      justify-content: center;
      align-items: center;

      transition: all .3s ease;
      animation: .3s appear;

      top: ${20 + (120 * tile.row)}px;
      left: ${20 + (120 * tile.column)}px;
      color: ${param(tile).color};
      background-color: ${param(tile).background};
      font-size: ${param(tile).font};
      z-index: ${tile.merged ? 9 : 10};
    }

    @keyframes appear {
      from {
        height: 0;
        width: 0;
        opacity: 0;
        margin-top: 50px;
        margin-left: 50px;
      }
      to {
        height: 100px;
        width: 100px;
        opacity: 1;
        margin-top: 0;
        margin-left: 0;
      }
    }
  `),
);
