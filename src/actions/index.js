import * as types from './types';
import * as utils from '../utils';

export const initLevel = level => {
  return {
    type: types.INIT_LEVEL,
    payload: { level, levelReady: true, levelCompleted: false }
  };
};

export const selectPlayer = (player, players) => {
  return {
    type: types.SELECT_PLAYER,
    payload: { player, players }
  };
};

export const startGame = levelStarted => dispatch => {
  if (levelStarted) setInterval(utils.startCounting, 1000);
  dispatch({
    type: types.INIT_LEVEL,
    payload: { levelStarted, levelCompleted: false }
  });
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: null
  });
};

export const levelEnd = levelCompleted => { 
  return {
    type: types.INIT_LEVEL,
    payload: { levelCompleted, levelStarted: false }
  };
};

export const onWinOrLose = (player, players) => dispatch => {
  dispatch(savePlayer(player, players));
};

export const savePlayer = (player, players) => {
  return {
    type: types.SAVE_PLAYER,
    payload: { player, players }
  };
};

export const nextLevel = level => dispatch => {
  if (level === 99) level = 1;
  dispatch(initLevel(level));
  dispatch({ type: types.GENERATE_LEVEL_SQUARES });
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: null
  });
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
  const linkedSquares = [].concat(
    utils.genHorizontalSquares(startSquare),
    utils.genVerticalSquares(startSquare),
    utils.genDiagonalSquares(startSquare)
  );
  const litSquares = linkedSquares.filter(s => {
    return utils.searchForArray(levelSquares, s) > -1;
  });
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: { levelSquares, checkedSquares: [startSquare], litSquares, times: [new Date()] }
  });
  dispatch({
    type: types.INIT_LEVEL,
    payload: { levelStarted: true, levelReady: false }
  });
};

export const checkSquare = (
  square,
  levelSquares,
  checkedSquares,
  time
) => dispatch => {
  const linkedSquares = [].concat(
    utils.genHorizontalSquares(square),
    utils.genVerticalSquares(square),
    utils.genDiagonalSquares(square)
  );
  const litSquares = linkedSquares.filter(s => {
    return (
      utils.searchForArray(levelSquares, s) > -1 &&
      !(utils.searchForArray(checkedSquares, s) > -1)
    );
  });
  console.log('checkedSquares', checkedSquares);
  checkedSquares.push(square);
  console.log('checkedSquaresAfterPush', checkedSquares);
  dispatch({
    type: types.CHECK_SQUARE,
    payload: { checkedSquares, litSquares },
    time
  });
  return { litSquares, checkedSquares };
};
