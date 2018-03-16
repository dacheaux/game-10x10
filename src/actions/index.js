import * as types from './types';
import * as utils from '../utils';

export const initLevel = (player, players) => {
  return {
    type: types.INIT_LEVEL,
    payload: {player, players}
  };
};

export const startGame = show => dispatch => {
  dispatch({
    type: types.MAIN_MENU,
    payload: !show
  });
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: null
  });
};

export const checkSquare = square => {
  return {
    type: types.CHECK_SQUARE,
    payload: square
  };
};

export const nextLevel = () => dispatch => {
  console.log('nextLevel');
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: null
  });
};

export const toMainMenu = () => dispatch => {
  console.log('toMainMenu');
  dispatch({
    type: types.MAIN_MENU,
    payload: null
  });
};

export const onWin = (player, players) => dispatch => {
  console.log('You have won');
  dispatch({ type: types.GENERATE_LEVEL_SQUARES, payload: {stopTimer: true} })
  dispatch(initLevel(player, players));
};

export const onLose = (player, players) => dispatch => {
  console.log('You have lost');
  dispatch({ type: types.GENERATE_LEVEL_SQUARES, payload: {stopTimer: true} })
  dispatch(initLevel(player, players));
};

export const generateLevelSquares = (startSquare, level) => dispatch => {
  let levelSquares = [startSquare];
  let nextSquare,
    current = startSquare;
  for (let i = 0; i < level; i++) {
    nextSquare = utils.genNextSquare(current, levelSquares);
    current = nextSquare;
    levelSquares.push(nextSquare);
  }
  let linkedSquares = [].concat(
    utils.genHorizontalSquares(startSquare),
    utils.genVerticalSquares(startSquare),
    utils.genDiagonalSquares(startSquare)
  );
  linkedSquares = linkedSquares.filter(s => {
    return utils.searchForArray(levelSquares, s) > -1;
  });
  console.log(levelSquares);
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: { levelSquares, linkedSquares }
  });
};

export const genLinkedSquares = (
  square,
  levelSquares,
  checked
) => dispatch => {
  let linkedSquares = [].concat(
    utils.genHorizontalSquares(square),
    utils.genVerticalSquares(square),
    utils.genDiagonalSquares(square)
  );
  linkedSquares = linkedSquares.filter(s => {
    return (
      utils.searchForArray(levelSquares, s) > -1 &&
      !(utils.searchForArray(checked, s) > -1)
    );
  });
  checkSquare(square);
  dispatch({
    type: types.GEN_LINKED_SQUARES,
    payload: { square, linkedSquares }
  });
  checked.push(square);
  return { linkedSquares, checked };
};

export const selectPlayer = (player, players) => {
  return {
    type: types.SELECT_PLAYER,
    payload: {player, players}
  }
}
