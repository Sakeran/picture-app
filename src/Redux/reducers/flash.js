const pushFlashMessage = (state, type, message) => {
  const newState = { ...state };
  newState[type] = newState[type].concat(message);
  return newState;
};

const defaultState = {
  error: [],
  info: [],
  success: []
};

export { defaultState };

export default (state=defaultState, action) => {
  switch(action.type) {
    case 'FLASH_ERROR':
      return pushFlashMessage(state, 'error', action.message);
    case 'FLASH_INFO':
      return pushFlashMessage(state, 'info', action.message);
    case 'FLASH_SUCCESS':
      return pushFlashMessage(state, 'success', action.message);
    case 'CLEAR_ALL_FLASH':
      return defaultState;
    case 'CLEAR_FLASH_MESSAGE':
      const {category, message} = action;
      const newState = { ...state };
      newState[category] = (state[category] || []).filter(e => e !== message);
      return newState;
    default:
      return state;
  }
}
