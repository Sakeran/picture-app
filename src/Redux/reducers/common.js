const defaultState = {
  user: null,
  redirect: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.user };
    case 'LOGOUT_USER':
      return { ...state, user: null };
    case 'REQUEST_REDIRECT':
      return { ...state, redirect: action.location };
    case 'CLEAR_REDIRECT':
      return { ...state, redirect: null };
    default:
      return state;
  }
};
