import * as types from '../actions/types';
import * as utils from '../utils';

const initialState = { litSquares: [], checkedSquares: [], levelSquares: [], timer: false, elapsedTime: 0 };

export default (state = initialState, action) => {
  let checkedSquares = [],
    litSquares = [],
    copyOfState;
  switch (action.type) {
    case types.CHECK_SQUARE:
      copyOfState = JSON.parse(JSON.stringify(state));
      checkedSquares = copyOfState.checkedSquares;
      litSquares = copyOfState.litSquares;
      const index = utils.searchForArray(litSquares, action.payload);
      if (index > -1) {
        litSquares.splice(index, 1);
      }
      checkedSquares.push(action.payload);
      return Object.assign({}, state, { checkedSquares, litSquares });
    case types.GEN_LINKED_SQUARES:
      copyOfState = JSON.parse(JSON.stringify(state));
      checkedSquares = copyOfState.checkedSquares;
      checkedSquares.push(action.payload.square);
      litSquares = [];
      litSquares.push(action.payload.linkedSquares);
      return Object.assign({}, state, { checkedSquares, litSquares });
    case types.GENERATE_LEVEL_SQUARES:
      console.log('action.payload', action.payload);
      if (!action.payload)
        return { levelSquares: [], litSquares: [], checkedSquares: [], timer: false };
      console.log('action.payload.stopTimer', state);
      if (action.payload.stopTimer) return Object.assign({}, state, { timer: false })
      const { levelSquares, linkedSquares } = action.payload;
      checkedSquares.push(levelSquares[0]);
      litSquares.push(linkedSquares);
      return Object.assign({}, state, {
        checkedSquares,
        litSquares: linkedSquares,
        levelSquares,
        timer: true
      });
    default:
      return state;
  }
};
