import * as types from './types';
import * as utils from '../utils';

export const initLevel = (level, lives) => {
  return {
    type: types.INIT_LEVEL,
    payload: { level, lives }
  };
};

export const showMainMenu = show => dispatch => {
  dispatch({
    type: types.MAIN_MENU,
    payload: show
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
    nextSquare = genNextSquare(current, levelSquares);
    current = nextSquare;
    levelSquares.push(nextSquare);
  }
  let linkedSquares = [].concat(
    genHorizontalSquares(start),
    genVerticalSquares(start),
    genDiagonalSquares(start)
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
    genHorizontalSquares(square),
    genVerticalSquares(square),
    genDiagonalSquares(square)
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

function genNextSquare(current, levelSquares) {
  let linkedSquares = [].concat(
    genHorizontalSquares(current),
    genVerticalSquares(current),
    genDiagonalSquares(current)
  );
  linkedSquares = linkedSquares.filter(s => {
    return !(utils.searchForArray(levelSquares, s) > -1);
  });
  return linkedSquares[Math.floor(Math.random() * linkedSquares.length)];
}

function genHorizontalSquares(current) {
  let horSq = [];
  let x = current[0] + 3;
  let y = current[1];
  if (0 < x && x < 11) horSq.push([x, y]);
  x = current[0] - 3;
  if (0 < x && x < 11) horSq.push([x, y]);
  return horSq;
}

function genVerticalSquares(current) {
  let verSq = [];
  let x = current[0];
  let y = current[1] + 3;
  if (0 < y && y < 11) verSq.push([x, y]);
  y = current[1] - 3;
  if (0 < y && y < 11) verSq.push([x, y]);
  return verSq;
}

function genDiagonalSquares(current) {
  let [x0, y0] = current;
  let diagSq = [];
  let x = x0 + 2;
  let y = y0 + 2;
  diagSq.push([x, y]);
  y = y0 - 2;
  diagSq.push([x, y]);
  x = x0 - 2;
  diagSq.push([x, y]);
  y = y0 + 2;
  diagSq.push([x, y]);
  const res = diagSq.filter(
    s => s[0] > 0 && s[1] > 0 && (s[0] < 11 && s[1] < 11)
  );
  return res;
}

function flatten(arr) {
  return [].concat(...arr);
}
