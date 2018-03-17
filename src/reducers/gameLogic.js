import * as types from '../actions/types';
import * as utils from '../utils';

const initialState = {
  levelSquares: [],
  checkedSquares: [],
  litSquares: [],
  elapsedTime: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_SQUARE:
      return Object.assign({}, state, { ...action.payload });
    case types.GENERATE_LEVEL_SQUARES:
      if (!action.payload) return initialState;
      return Object.assign({}, state, { ...action.payload });
    default:
      return state;
  }
};
