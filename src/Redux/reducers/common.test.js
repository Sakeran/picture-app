import reducer from './common';
describe('Common reducer', () => {

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
