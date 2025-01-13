import { createReducer, on } from '@ngrx/store';
import { AuthState } from './state';
import { AuthActions } from './actions';

export const AuthReducer = createReducer(
  AuthState.INIT_STATE,
  on(AuthActions.startRegister, (state) => {
    return { ...state, isSubmitting: true };
  }),
  on(AuthActions.registerSuccess, (state, action) => {
    return { ...state, isSubmitting: false, register: action.register };
  }),
  on(AuthActions.registerFailure, (state, action) => {
    return { ...state, isSubmitting: false, error: action.error };
  }),
  on(AuthActions.startLogin, (state) => {
    return { ...state, isSubmitting: true };
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return { ...state, isSubmitting: false, login: action.login };
  }),
  on(AuthActions.loginFailure, (state, action) => {
    return { ...state, isSubmitting: false, error: action.error };
  })
);
