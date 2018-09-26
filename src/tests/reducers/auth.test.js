import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});

});

test('should set uid for login', () => {
  const uid = 'abc';
  const action = {
    type: 'LOGIN',
    uid
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({uid});
});

test('should set uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
});
