import * as types from './types';
import * as utils from '../utils';

export const initLevel = level => {
  return {
    type: types.INIT_LEVEL,
    payload: level
  };
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
    type: types.GENERATE_GAME_SQUARES,
    payload: null
  });
};

export const toMainMenu = () => dispatch => {
  console.log('toMainMenu');
  dispatch({
    type: types.TO_MAIN_MENU,
    payload: null
  });
};

export const onWin = () => dispatch => {
  console.log('You have won');
  let level = localStorage.getItem('level');
  if (level < 99) {
    level++;
  } else {
    level = 1;
  }
  localStorage.setItem('level', level);
  dispatch(initLevel(level));
  dispatch({ type: types.WIN, payload: null })
}

export const onLose = () => dispatch => {
  console.log('You have lost');
  dispatch({ type: types.LOSE, payload: null })
}

export const generateGameSquares = start => dispatch => {
  const level = localStorage.getItem('level');
  let activeSquares = [start];
  let nextSquare,
    current = start;
  for (let i = 0; i < level; i++) {
    nextSquare = genNextSquare(current, activeSquares);
    current = nextSquare;
    activeSquares.push(nextSquare);
  }
  let linkedSquares = [].concat(
    genHorizontalSquares(start),
    genVerticalSquares(start),
    genDiagonalSquares(start)
  );
  linkedSquares = linkedSquares.filter(s => {
    return utils.searchForArray(activeSquares, s) > -1;
  });
  console.log(activeSquares);
  dispatch({
    type: types.GENERATE_GAME_SQUARES,
    payload: { activeSquares, linkedSquares }
  });
};

export const genLinkedSquares = (
  square,
  activeSquares,
  checked
) => dispatch => {
  let linkedSquares = [].concat(
    genHorizontalSquares(square),
    genVerticalSquares(square),
    genDiagonalSquares(square)
  );
  linkedSquares = linkedSquares.filter(s => {
    return (
      utils.searchForArray(activeSquares, s) > -1 &&
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

function genNextSquare(current, activeSquares) {
  let linkedSquares = [].concat(
    genHorizontalSquares(current),
    genVerticalSquares(current),
    genDiagonalSquares(current)
  );
  linkedSquares = linkedSquares.filter(s => {
    return !(utils.searchForArray(activeSquares, s) > -1);
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
