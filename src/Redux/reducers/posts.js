module.exports = (state={}, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_POST':
      newState = Object.assign({}, state);
      newState[action.post.id] = action.post;
      return newState;
    case 'REMOVE_POST':
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};
