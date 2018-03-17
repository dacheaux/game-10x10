import * as types from './types';
import * as utils from '../utils';

export const initLevel = level => {
  return {
    type: types.INIT_LEVEL,
    payload: {level}
  };
};

export const selectPlayer = (player, players) => {
  return {
    type: types.SELECT_PLAYER,
    payload: {player, players}
  }
}

export const startGame = start => dispatch => {
  dispatch({
    type: types.START_GAME,
    payload: {start}
  });
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: null
  });
};

export const onWin = (level, player, players) => dispatch => {
  dispatch(initLevel(level));
  dispatch({ type: types.GENERATE_LEVEL_SQUARES, payload: {stopTimer: true} })
  dispatch(savePlayer(player, players));
};

export const onLose = (level, player, players) => dispatch => {
  dispatch(initLevel(level));
  dispatch({ type: types.GENERATE_LEVEL_SQUARES, payload: {stopTimer: true} })
  dispatch(savePlayer(player, players));
};

export const savePlayer = (player, players) => {
  return {
    type: types.SAVE_PLAYER,
    payload: {player, players}
  };
};

export const nextLevel = (level) => dispatch => {
  dispatch(initLevel(level));
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
    payload: { levelSquares, checkedSquares: [startSquare], litSquares }
  });
};

export const checkSquare = (
  square,
  levelSquares,
  checkedSquares
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
  checkedSquares.push(square);
  dispatch({
    type: types.CHECK_SQUARE,
    payload: { checkedSquares, litSquares }
  });
  return { litSquares, checkedSquares };
};
