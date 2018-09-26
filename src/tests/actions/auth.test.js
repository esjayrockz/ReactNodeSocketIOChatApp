import { login, logout } from '../../actions/auth';

test('should setup login action object',() => {
  const action = login('abc');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'abc'
  });
});

test('should setup logout action object',() => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
