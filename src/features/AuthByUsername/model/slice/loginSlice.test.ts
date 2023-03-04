import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from 'features/AuthByUsername';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  test('test set user name', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' };
    expect(loginReducer(
      state as LoginSchema,
      loginActions.setUserName('1234'),
    )).toEqual({ username: '1234' });
  });

  test('test set user password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };
    expect(loginReducer(
      state as LoginSchema,
      loginActions.setPassword('1234'),
    )).toEqual({ password: '1234' });
  });
});
