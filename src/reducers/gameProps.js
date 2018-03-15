import * as types from '../actions/types'

let initialState = {level: 1, lives: 0, mainMenu: true}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.INIT_LEVEL:
      return Object.assign({}, state, {level: action.payload})
    case types.LEVEL_WIN_LOSE:
      return Object.assign({}, state, {...action.payload});
    case types.GAME_WON:
      return state;
    case types.MAIN_MENU:
      return Object.assign({}, state, {mainMenu: action.payload});
    default:
      return state;
  }
}