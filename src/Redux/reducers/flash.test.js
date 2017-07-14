import reducer from './flash';

describe('flash reducer', () => {
  test('FLASH_ERROR action', () => {
    const state = {};
    const action = {type: 'FLASH_ERROR', message: 'Test Message'};
    const newState = reducer(state, action);
    expect(state !== newState);
    expect(newState.error).toHaveLength(1);
    expect(newState.error[0]).toBe('Test Message');
  });

  test('FLASH_INFO action', () => {
    const state = {};
    const action = {type: 'FLASH_INFO', message: 'Test Message'};
    const newState = reducer(state, action);
    expect(state !== newState);
    expect(newState.info).toHaveLength(1);
    expect(newState.info[0]).toBe('Test Message');
  });

  test('FLASH_SUCCESS action', () => {
    const state = {};
    const action = {type: 'FLASH_SUCCESS', message: 'Test Message'};
    const newState = reducer(state, action);
    expect(state !== newState);
    expect(newState.success).toHaveLength(1);
    expect(newState.success[0]).toBe('Test Message');
  });

  test('CLEAR_ALL_FLASH action', () => {
    const state = {error: ['error'], info: ['info']};
    const action = {type: 'CLEAR_ALL_FLASH'};
    const newState = reducer(state, action);
    expect(newState.error).toHaveLength(0);
    expect(newState.info).toHaveLength(0);
  });

  test('CLEAR_FLASH_MESSAGE action', () => {
    const state = {error: ['error'], info: ['info']};
    const action = {
      type: 'CLEAR_FLASH_MESSAGE',
      category: 'error',
      message: 'error'
    };
    const newState = reducer(state, action);
    expect(state !== newState);
    expect(newState.error).toHaveLength(0);
    expect(newState.info).toHaveLength(1);
  });
});
