import * as types from './types';
import * as utils from '../utils';
import * as helpers from '../utils/helpers';

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
  let current = helpers.unshiftSquare(quadrant, startSquare);
  let quodrantSquares = [current];
  let levelSquares = [],
    numOfGenSquares = 0,
    possibleSquares = null,
    quodrantSquaresWithOpts = [],
    changeQuodrant = false;
  while (numOfGenSquares + quodrantSquares.length < numOfSquares) {
    if (!Boolean(quodrantSquares.length % 25)) {
      const isValidQuadrant = helpers.isValidQuadrant(quadrant, quodrantSquares)
      if (!isValidQuadrant) {
        current = quodrantSquares[0]
        quodrantSquares = [current]
        quodrantSquaresWithOpts = []
      } else {
        numOfGenSquares = numOfGenSquares + 25;
        levelSquares = levelSquares.concat(helpers.shiftSquares(quadrant, quodrantSquares))
      }
    }
    changeQuodrant = !Boolean(quodrantSquares.length % 25);
    if (changeQuodrant) {
      quodrantSquares = [];
      quodrantSquaresWithOpts = [];
      current = helpers.shiftSquare(quadrant, current);
      possibleSquares = utils.genPossibleSquares(current, levelSquares, 11);
      current = possibleSquares[Math.floor(Math.random() * possibleSquares.length)];
      quadrant = helpers.currentQuadrant(current);
      current = helpers.unshiftSquare(quadrant, current);
      quodrantSquares.push(JSON.parse(JSON.stringify(current)));
      continue;
    }
    possibleSquares = utils.genPossibleSquares(current, quodrantSquares, 6);
    current = utils.addSquareToLevel(possibleSquares, quodrantSquares, quodrantSquaresWithOpts, quadrant)
  }
  levelSquares = levelSquares.concat(helpers.shiftSquares(quadrant, quodrantSquares))
  const linkedSquares = [].concat(
    utils.genHorizontalSquares(startSquare, 11),
    utils.genVerticalSquares(startSquare, 11),
    utils.genDiagonalSquares(startSquare, 11)
  );
  const litSquares = linkedSquares.filter(s => {
    return helpers.searchForArray(levelSquares, s) > -1;
  });
  dispatch({
    type: types.GENERATE_LEVEL_SQUARES,
    payload: {
      levelSquares,
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
