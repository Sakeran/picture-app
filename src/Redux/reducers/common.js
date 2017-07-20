const defaultState = {
  user: null,
  redirect: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'REQUEST_REDIRECT':
      return { ...state, redirect: action.location };
    case 'CLEAR_REDIRECT':
      return { ...state, redirect: null };
    default:
      return state;
  }
};
