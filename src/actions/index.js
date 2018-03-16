import * as types from './types';
import * as utils from '../utils';

export const initLevel = (level, lives) => {
  return {
    type: types.INIT_LEVEL,
    payload: { level, lives }
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

export const onWin = () => dispatch => {
  console.log('You have won');
  let level = localStorage.getItem('level');
  let lives;
  let timesCompleted = localStorage.getItem('timesCompleted');

  if (level === 1) {
    lives = 1;
  } else {
    lives = localStorage.getItem('lives');
    lives++;
  }
  if (level < 99) {
    level++;
  } else {
    level = 1;
  }
  localStorage.setItem('lives', lives);
  localStorage.setItem('level', level);
  localStorage.setItem('timesCompleted', timesCompleted);
  dispatch({ type: types.GENERATE_LEVEL_SQUARES, payload: {stopTimer: true} })
  dispatch(initLevel(level, lives));
};

export const onLose = (uncheckedSquares) => dispatch => {
  console.log('You have lost');
  let level = localStorage.getItem('level');
  let lives;
  if (level === 1) {
    lives = 0;
  } else {
    lives = localStorage.getItem('lives');
    lives = lives - uncheckedSquares;
    if (lives < 0 || lives === 0) {
      console.log('lives < 0', lives);
      lives = 0;
      level = 1;
    };
  }
  localStorage.setItem('level', level);
  localStorage.setItem('lives', lives);
  console.log('lives ++', lives);
  dispatch({ type: types.GENERATE_LEVEL_SQUARES, payload: {stopTimer: true} })
  dispatch(initLevel(level, lives));
};

export const generateLevelSquares = start => dispatch => {
  const level = localStorage.getItem('level');
  let levelSquares = [start];
  let nextSquare,
    current = start;
  for (let i = 0; i < level; i++) {
    nextSquare = utils.genNextSquare(current, levelSquares);
    current = nextSquare;
    levelSquares.push(nextSquare);
  }
  let linkedSquares = [].concat(
    utils.genHorizontalSquares(start),
    utils.genVerticalSquares(start),
    utils.genDiagonalSquares(start)
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

export const selectPlayer = player => {
  return {
    type: types.SELECT_PLAYER,
    payload: player
  }
}
