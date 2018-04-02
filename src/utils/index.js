import * as helpers from './helpers';

/**
Fetches logged in player and list of all players from local storage
@param {string} playerName
*/
export function fetchPlayer(playerName) {
  let player = JSON.parse(localStorage.getItem('player--game-100hops'));
  let players = JSON.parse(localStorage.getItem('players--game-100hops')) || [];
  const noPlayer = !Boolean(player);
  const newPlayer = {
    level: 1,
    lives: 0,
    scores: {}
  };
  if (noPlayer) {
    player = newPlayer;
    player.name = 'anonPlayer';
    players.push(player);
  } else if (player.name !== playerName) {
    player = players.filter(player => player.name === playerName)[0];
    if (!player) {
      player = newPlayer;
      player.name = playerName;
      players.push(player);
    }
  }
  localStorage.setItem('player--game-100hops', JSON.stringify(player));
  localStorage.setItem('players--game-100hops', JSON.stringify(players));
  return { player, players };
}

/**
Finds next square to generate from array of possible squares
@param {array} possibleSquares
@param {array} quodrantSquares
@param {array} quodrantSquaresWithOpts
@param {number} quadrant
@return {array} next generated square
*/
export function addSquareToLevel(
  possibleSquares,
  quodrantSquares,
  quodrantSquaresWithOpts,
  quadrant
) {
  let random = 0,
    currentOpts = [],
    current = null;
  if (!possibleSquares) {
    quodrantSquares.pop();
    while (!quodrantSquaresWithOpts[quodrantSquaresWithOpts.length - 1].length) {
      quodrantSquaresWithOpts.pop();
      quodrantSquares.pop();
    }
    currentOpts = quodrantSquaresWithOpts[quodrantSquaresWithOpts.length - 1];
    random = Math.floor(Math.random() * currentOpts.length);
    current = currentOpts[random];
    quodrantSquares.push(JSON.parse(JSON.stringify(current)));
    currentOpts.splice(random, 1);
    quodrantSquaresWithOpts.pop();
    quodrantSquaresWithOpts.push(currentOpts);
  } else {
    random = Math.floor(Math.random() * possibleSquares.length);
    current = possibleSquares[random];
    quodrantSquares.push(JSON.parse(JSON.stringify(current)));
    possibleSquares.splice(random, 1);
    quodrantSquaresWithOpts.push(possibleSquares);
  }
  return current;
}

/**
Generates possible squares from current square
@param {array} current - current square
@param {array} levelSquares
@param {number} coef - number which constrains the position of square
@return {array} all posible squares
*/
export function genPossibleSquares(current, levelSquares, coef) {
  let linkedSquares = [].concat(
    genHorizontalSquares(current, coef),
    genVerticalSquares(current, coef),
    genDiagonalSquares(current, coef)
  );
  linkedSquares = linkedSquares.filter(s => {
    return !(helpers.searchForArray(levelSquares, s) > -1);
  });
  if (!linkedSquares.length) return null;
  return linkedSquares;
}

/**
Generates possible horizontal squares from current square
@param {array} current - current square
@param {number} coef - number which constrains the position of square
@return {array} array of squares two fields away from current square in horizontal direction
*/
export function genHorizontalSquares(current, coef) {
  let horSq = [];
  let x = current[0] + 3;
  let y = current[1];
  if (0 < x && x < coef) horSq.push([x, y]);
  x = current[0] - 3;
  if (0 < x && x < coef) horSq.push([x, y]);
  return horSq;
}

/**
Generates possible vertical squares from current square
@param {array} current - current square
@param {number} coef - number which constrains the position of square
@return {array} array of squares two fields away from current square in vertical direction
*/
export function genVerticalSquares(current, coef) {
  let verSq = [];
  let x = current[0];
  let y = current[1] + 3;
  if (0 < y && y < coef) verSq.push([x, y]);
  y = current[1] - 3;
  if (0 < y && y < coef) verSq.push([x, y]);
  return verSq;
}

/**
Generates possible diagonal squares from current square
@param {array} current - current square
@param {number} coef - number which constrains the position of square
@return {array} array of squares one field away from current square in diagonal direction
*/
export function genDiagonalSquares(current, coef) {
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
    s => s[0] > 0 && s[1] > 0 && (s[0] < coef && s[1] < coef)
  );
  return res;
}
