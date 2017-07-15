import reducer from './common';
describe('Common reducer', () => {

  test('LOGIN_USER action', () => {
    const state = {
      user: null
    };
    const user = {
      information: 'User Info'
    };
    const action = {type: 'LOGIN_USER', user: user };
    const newState = reducer(state, action);
    expect(state !== newState);
    expect(newState.user.information).toBe('User Info');
  });

  test('LOGOUT_USER action', () => {
    const state = {
      information: 'User Info'
    };
    const action = {type: 'LOGOUT_USER'};
    const newState = reducer(state, action);
    expect(state !== newState);
    expect(newState.user).toBeNull();
  });

  test('REQUEST_REDIRECT action', () => {
    const state = {};
    const action = {type: 'REQUEST_REDIRECT', location: '/test'};
    const newState = reducer(state, action);
    expect(state !== newState);
    expect(newState.redirect).toBe('/test');
  });

  test('CLEAR_REDIRECT action', () => {
    const state = {redirect: '/test'};
    const action = {type: 'CLEAR_REDIRECT'};
    const newState = reducer(state, action);
    expect(state !== newState);
    expect(newState.redirect).toBeFalsy();
  });

});
