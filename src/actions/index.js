import * as types from './types';
import * as utils from '../utils';
import * as helpers from '../utils/helpers';
import { store } from '../index';

export const initLevel = level => {
  return {
    type: types.INIT_LEVEL,
    payload: { level, levelReady: true, levelCompleted: false }
  };
};

export const selectPlayer = (player, players) => {
  return {
    type: types.SELECT_PLAYER,
    payload: { player, players, level: player.level }
  };
};

export const startGame = levelStarted => dispatch => {
  dispatch({ type: types.SET_MODAL, payload: { isEndLevelModalOpen: false } });
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

export const setModal = (isWin, level) => dispatch => {
  let modalHeading = isWin ? `You have completed level: ${level}` : 'End game';
  let modalText = isWin
    ? 'Do you want to play another level?'
    : 'You have lost this level. Do you want to try again?';
  if (level === 99 && isWin) {
    modalHeading = 'Congratulations, you have finished the game!';
    modalText = 'Do you want to play from the beginning?';
  }
  dispatch({
    type: types.SET_MODAL,
    payload: { modalHeading, modalText, isEndLevelModalOpen: true }
  });
};

export const choosePlayer = isChoosePlayerOpen => {
  return {
    type: types.SET_MODAL,
    payload: { isChoosePlayerOpen }
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
  if (level > 99) level = 1;
  dispatch({ type: types.SET_MODAL, payload: { isEndLevelModalOpen: false } });
  dispatch(initLevel(level));
  dispatch({ type: types.GENERATE_LEVEL_SQUARES });
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: null
  });
};

export const generateLevelSquares = (startSquare, level) => async dispatch => {
  const numOfSquares = level + 1;
  let quadrant = helpers.currentQuadrant(startSquare);
  let levelSquares = [helpers.unshiftSquare(quadrant, startSquare)];
  let levelFull = [];
  let numOfGenSquares = 0;
  let nextSquare,
    current = helpers.unshiftSquare(quadrant, startSquare),
    levelSquaresWithOpts = [],
    i = 0,
    addSquareToLevel = {},
    changeQuodrant = false;
  while (numOfGenSquares + levelSquares.length < numOfSquares) {
    if (!Boolean(levelSquares.length % 25)) {
      const isValidQuadrant = helpers.isValidQuadrant(quadrant, levelSquares)
      if (!isValidQuadrant) {
        current = levelSquares[0]
        levelSquares = [current]
        levelSquaresWithOpts = []
      } else {
        numOfGenSquares = numOfGenSquares + 25;
        levelFull = levelFull.concat(helpers.shiftSquares(quadrant, levelSquares))
        levelSquares = [];
        levelSquaresWithOpts = [];
      }
    }
    changeQuodrant = !Boolean(levelSquares.length % 25);
    if (changeQuodrant) {
      levelSquares = [];
      levelSquaresWithOpts = [];
      current = helpers.shiftSquare(quadrant, current);
      nextSquare = utils.genNextSquare(current, levelFull, 11);
      current = nextSquare[Math.floor(Math.random() * nextSquare.length)];
      quadrant = helpers.currentQuadrant(current);
      current = helpers.unshiftSquare(quadrant, current);
      levelSquares.push(JSON.parse(JSON.stringify(current)));
      if (!((numOfSquares - 1) % 25)) {++numOfGenSquares; continue};
    }
    nextSquare = utils.genNextSquare(current, levelSquares, 6);
    addSquareToLevel = utils.addSquareToLevel(nextSquare, current, levelSquares, levelSquaresWithOpts, quadrant)
    current = addSquareToLevel.next;
    levelSquares = addSquareToLevel.levelSquares;
    levelSquaresWithOpts = addSquareToLevel.levelSquaresWithOpts;
  }
  levelFull = levelFull.concat(helpers.shiftSquares(quadrant, levelSquares))
  const linkedSquares = [].concat(
    utils.genHorizontalSquares(startSquare, 11),
    utils.genVerticalSquares(startSquare, 11),
    utils.genDiagonalSquares(startSquare, 11)
  );
  const litSquares = linkedSquares.filter(s => {
    return helpers.searchForArray(levelFull, s) > -1;
  });
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: {
      levelSquares: levelFull,
      checkedSquares: [startSquare],
      litSquares,
      times: [new Date()]
    }
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
    utils.genHorizontalSquares(square, 11),
    utils.genVerticalSquares(square, 11),
    utils.genDiagonalSquares(square, 11)
  );
  const litSquares = linkedSquares.filter(s => {
    return (
      helpers.searchForArray(levelSquares, s) > -1 &&
      !(helpers.searchForArray(checkedSquares, s) > -1)
    );
  });
  checkedSquares.push(square);
  dispatch({
    type: types.CHECK_SQUARE,
    payload: { checkedSquares, litSquares },
    time
  });
  return { litSquares, checkedSquares };
};
