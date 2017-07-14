import { createStore, combineReducers } from 'redux';

import common from './reducers/common';
import posts from './reducers/posts';
import flash from './reducers/flash';

const mainReducer = combineReducers({
  common,
  posts,
  flash
});

export default createStore(mainReducer);
