module.exports = (state={}, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_POST':
      newState = { ...state };
      const post = newState[action.post.id];
      const newPost = { ...post, ...action.post}
      newState[action.post.id] = newPost;
      return newState;
    case 'REMOVE_POST':
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};
