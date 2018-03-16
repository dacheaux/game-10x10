import * as types from '../actions/types';

const initialState = {
  name: '',
  level: 1,
  lives: 0,
  timesCompleted: {},
  players: [],
  mainMenu: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.MAIN_MENU:
      return Object.assign({}, state, { mainMenu: action.payload });
    case types.SELECT_PLAYER:
      const players = JSON.parse(JSON.stringify(state.players));
      players.push(action.payload);
      return Object.assign({}, state, { ...action.payload }, { players });
    case types.INIT_LEVEL:
      return Object.assign({}, state, { ...action.payload });
    case types.GAME_WON:
      return state;
    default:
      return state;
  }
};
