import * as types from '../actions/types'

let initialState = {level: 1, mainMenu: true}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.INIT_LEVEL:
      return Object.assign({}, {level: action.payload})
    case types.WIN:
      return state;
    case types.LOSE:
      return state;
    case types.GAME_WON:
      return state;
    case types.MAIN_MENU:
      return Object.assign({}, state, {mainMenu: action.payload});
    default:
      return state;
  }
}