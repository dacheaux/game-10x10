import * as types from '../actions/types';

const initialState = {
  levelSquares: [],
  checkedSquares: [],
  litSquares: [],
  times: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_SQUARE:
      const times = state.times.slice(0);
      times.push(action.time);
      return Object.assign({}, state, { ...action.payload }, {times});
    case types.GENERATE_LEVEL_SQUARES:
      if (!action.payload) return initialState;
      return Object.assign({}, state, { ...action.payload });
    default:
      return state;
  }
};
