import { combineReducers } from 'redux';
// import { reducer as reduxForm } from 'redux-form';
import gameLogic from './gameLogic';
import gameProps from './gameProps';

export default combineReducers({
  gameLogic,
  gameProps
});