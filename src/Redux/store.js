import { createStore, combineReducers } from 'redux';

import common from './reducers/common';
import flash from './reducers/flash';

const mainReducer = combineReducers({
  common,
  flash
});

export default createStore(mainReducer);
