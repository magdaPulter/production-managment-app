import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterModel } from '../../models/register.model';
import { LoginModel } from '../../models/login.model';

export interface AuthState {
  readonly register: RegisterModel;
  readonly login: LoginModel;
  readonly isSubmitting: boolean;
  readonly error: null | Error;
}

export namespace AuthState {
  export const INIT_STATE: AuthState = {
    register: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    login: {
      email: '',
      password: '',
    },
    isSubmitting: false,
    error: null,
  };

  export const selectAuthState = createFeatureSelector<AuthState>('auth'); // global state

  export const selectIsSubmitting = createSelector(
    selectAuthState,
    (state: AuthState) => state.isSubmitting
  );
  export const selectRegister = createSelector(
    selectAuthState,
    (state: AuthState) => state.register
  );
  export const selectLogin = createSelector(
    selectAuthState,
    (state: AuthState) => state.login
  );

  export const selectError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
  );
}
