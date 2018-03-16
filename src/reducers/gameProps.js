import * as types from '../actions/types';

const initialState = {
  players: [],
  player: {
    name: '',
    level: 1,
    lives: 0,
    scores: {}
  },
  level: 1,
  mainMenu: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.MAIN_MENU:
      return Object.assign({}, state, { mainMenu: action.payload });
    case types.SELECT_PLAYER:
      return Object.assign({}, state, { ...action.payload });
    case types.INIT_LEVEL:
      return Object.assign({}, state, { ...action.payload });
    case types.GAME_WON:
      return state;
    default:
      return state;
  }
};
