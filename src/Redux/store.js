import { createStore, combineReducers } from 'redux';

import common from './reducers/common';
import posts from './reducers/posts';

const mainReducer = combineReducers({
  common,
  posts
});

export default createStore(mainReducer);
