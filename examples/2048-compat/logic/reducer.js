import { init } from '../game/init';
import { chooseRandomTile, addTile } from '../game/add';
import { update } from '../game/tile';
import { move } from '../game/move';
import { hasWon, hasLost } from '../game/end';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      const newState = {
        board: init(),
        changed: false,
        won: false,
        lost: false,
      };
      const { row, column, value } = chooseRandomTile(
        newState.board,
        action.randomPosition,
        action.randomValue,
      );
      newState.board = addTile(newState.board, row, column, value);
      newState.board = update(newState.board);
      return newState;
    }
    case 'MOVE': {
      const newState = move(state.board, action.direction);
      if (newState.changed) {
        const { row, column, value } = chooseRandomTile(
          newState.board,
          action.randomPosition,
          action.randomValue,
        );
        newState.board = addTile(newState.board, row, column, value);
      }
      newState.board = update(newState.board);
      newState.won = hasWon(newState.board);
      newState.lost = hasLost(newState.board);
      return newState;
    }
    default: {
      return state;
    }
  }
};
