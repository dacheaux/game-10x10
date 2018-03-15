import * as types from '../actions/types'

const genRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let x = genRandomNum(1, 10), y = genRandomNum(1, 10);
let first = [x, y];
// let rowNum = Math.ceil(first / 10);
// let linkedSquares = [first - 30, first + 3, first + 30, first - 3];
// let activeSquares = [first].concat(linkedSquares);

let initialState = {level: 1, activeSquares: []}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.INIT_LEVEL:
      return Object.assign({}, {level: action.payload})
    case types.WIN:
      return state;
    case types.LOSE:
      return state;
    case types.GAME_WON:
      return state;
    case types.TO_MAIN_MENU:
      return state;
    default:
      return state;
  }
}