import * as types from '../actions/types';
import * as utils from '../utils';

const initialState = {
  levelSquares: [],
  checkedSquares: [],
  litSquares: [],
  timer: false,
  elapsedTime: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_SQUARE:
      return Object.assign({}, state, { ...action.payload });
    case types.GENERATE_LEVEL_SQUARES:
      if (!action.payload) return initialState;
      if (action.payload.stopTimer)
        return Object.assign({}, state, { timer: false });
      return Object.assign({}, state, {
        ...action.payload,
        timer: true
      });
    default:
      return state;
  }
};
