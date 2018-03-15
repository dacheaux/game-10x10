import * as types from '../actions/types';
import * as utils from '../utils';

const initialState = { litSquares: [], checkedSquares: [], activeSquares: [] };

export default (state = initialState, action) => {
let checkedSquares = [],
  litSquares = [], copyOfState, index;
  switch (action.type) {
    case 'litSquares_SQUARE':
      return state;
    case types.CHECK_SQUARE:
      copyOfState = JSON.parse(JSON.stringify(state));
      checkedSquares = copyOfState.checkedSquares;
      litSquares = copyOfState.litSquares;
      index = utils.searchForArray(litSquares, action.payload);
      if (index > -1) {
        litSquares.splice(index, 1);
      }
      console.log('State is %s and copy of state is %s', JSON.stringify(state), JSON.stringify(copyOfState));
      checkedSquares.push(action.payload);
      return Object.assign({}, state, { checkedSquares, litSquares });
    case types.GEN_LINKED_SQUARES:
      copyOfState = JSON.parse(JSON.stringify(state));
      checkedSquares = copyOfState.checkedSquares;
      checkedSquares.push(action.payload.square);
      litSquares = [];
      litSquares.push(action.payload.linkedSquares);
      return Object.assign({}, state, { checkedSquares, litSquares })
    case types.GENERATE_GAME_SQUARES:
      if (!action.payload) return { activeSquares: [], litSquares: [], checkedSquares: [] }
      const {activeSquares, linkedSquares} = action.payload;
      checkedSquares.push(activeSquares[0]);
      litSquares.push(linkedSquares);
      return Object.assign({}, state, { checkedSquares, litSquares: linkedSquares, activeSquares });
    default:
      return state;
  }
};
