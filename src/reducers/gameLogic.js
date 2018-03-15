import * as types from '../actions/types';
import * as utils from '../utils';

let initialState = { lit: [], checked: [], activeSquares: [] };
// let checked;


export default (state = initialState, action) => {
let checked = [],
  lit = [], copyOfState, index;
  switch (action.type) {
    case 'LIT_SQUARE':
      return state;
    case types.CHECK_SQUARE:
      copyOfState = JSON.parse(JSON.stringify(state));
      checked = copyOfState.checked;
      lit = copyOfState.lit;
      index = utils.searchForArray(lit, action.payload);
      if (index > -1) {
        lit.splice(index, 1);
      }
      console.log('State is %s and copy of state is %s', JSON.stringify(state), JSON.stringify(copyOfState));
      checked.push(action.payload);
      return Object.assign({}, state, { checked, lit });
    case types.GEN_LINKED_SQUARES:
      console.log(action.payload.linkedSquares);
      copyOfState = JSON.parse(JSON.stringify(state));
      checked = copyOfState.checked;
      checked.push(action.payload.square);
      lit = [];
      lit.push(action.payload.linkedSquares);
      return Object.assign({}, state, { checked, lit })
    case types.GENERATE_GAME_SQUARES:
      if (!action.payload) return { activeSquares: [], lit: [], checked: [] }
      let activeSquares = action.payload.activeSquares;
      let linkedSquares = action.payload.linkedSquares;
      checked.push(activeSquares[0]);
      lit.push(linkedSquares);
      console.log(lit, checked);
      return Object.assign({}, state, { checked, lit: linkedSquares, activeSquares });
    default:
      return state;
  }
};
