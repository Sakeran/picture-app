import { createStore, combineReducers } from 'redux';

import common from './reducers/common';

const mainReducer = combineReducers({
  common
});

export default createStore(mainReducer);
