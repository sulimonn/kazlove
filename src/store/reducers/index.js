import { combineReducers } from 'redux';
import girls from './girls';
import action from './action';
import catalog from './catalog';
import menu from './menu';

const reducers = combineReducers({
  girls,
  action,
  catalog,
  menu,
});

export default reducers;
