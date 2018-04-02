import * as types from '../actions/types';

const initialState = {
  players: [],
  player: JSON.parse(localStorage.getItem('player--game-100hops')) || {
    name: '',
    level: 1,
    lives: 0,
    scores: {}
  },
  levelReady: false,
  level: 1,
  levelStarted: false,
  levelCompleted: false,
  isEndLevelModalOpen: false,
  isChoosePlayerOpen: false,
  modalText: '',
  modalHeading: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_PLAYER:
      return Object.assign({}, state, { ...action.payload });
    case types.SAVE_PLAYER:
      return Object.assign({}, state, { ...action.payload });
    case types.INIT_LEVEL:
      return Object.assign({}, state, { ...action.payload });
    case types.SET_MODAL:
      return Object.assign({}, state, { ...action.payload }); 
    case types.GAME_WON:
      return state;
    default:
      return state;
  }
};
