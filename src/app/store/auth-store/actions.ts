import { createActionGroup, props } from '@ngrx/store';
import { RegisterModel } from '../../models/register.model';
import { LoginModel } from '../../models/login.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Start Register': props<{ register: RegisterModel }>(),
    'Register Success': props<{ register: RegisterModel }>(),
    'Register Failure': props<{ error: Error }>(),
    'Start Login': props<{ login: LoginModel }>(),
    'Login Success': props<{ login: LoginModel }>(),
    'Login Failure': props<{ error: Error }>(),
  },
});
