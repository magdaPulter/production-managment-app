import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { AuthState } from './state';
import { LoginModel } from '../../models/login.model';

@Injectable()
export class AuthEffects {
  readonly actions$ = inject(Actions);
  readonly store = inject(Store);
  readonly authService = inject(AuthService);

  registerEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.startRegister),
      switchMap(({ register }) => {
        return this.authService
          .register(register.email, register.password)
          .pipe(
            map(() => {
              return AuthActions.registerSuccess({ register });
            }),
            catchError((error) => {
              return of(AuthActions.registerFailure({ error }));
            })
          );
      })
    );
  });

  loginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.startLogin),
      switchMap(({ login }) => {
        return this.authService.login(login.email, login.password).pipe(
          map(() => {
            return AuthActions.loginSuccess({ login });
          })
        );
      }),
      catchError((error) => {
        return of(AuthActions.loginFailure({ error }));
      })
    );
  });
}
