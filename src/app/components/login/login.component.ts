import {
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { RegisterModel } from '../../models/register.model';
import { LoginModel } from '../../models/login.model';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, Observable, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth-store/actions';
import { AuthState } from '../../store/auth-store/state';
import { CommonModule } from '@angular/common';

export enum LoginState {
  LOGIN = 'login',
  REGISTER = 'register',
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly registerCredentials: RegisterModel = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  readonly loginCredentials: LoginModel = {
    email: '',
    password: '',
  };
  readonly loginState: WritableSignal<LoginState> = signal(LoginState.LOGIN);
  readonly login = LoginState.LOGIN;
  readonly register = LoginState.REGISTER;
  readonly errorMessage: WritableSignal<string> = signal('');
  private _delayedMessage$: Subject<string> = new BehaviorSubject<string>('');
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  readonly error$: Observable<null | Error> = this.store.select(
    AuthState.selectError
  );

  changeLoginState(loginState: LoginState) {
    this.loginState.set(loginState);
  }

  clearErrorMessage() {
    return this._delayedMessage$
      .asObservable()
      .pipe(
        debounceTime(3000),
        tap((message) => this.errorMessage.set(message)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onRegisterFormSubmitted(registerForm: NgForm) {
    if (registerForm.valid) {
      const register = this.registerCredentials;
      this.store.dispatch(AuthActions.startRegister({ register }));
    }
    this.error$
      .pipe(
        tap((error) => {
          if (error) {
            this.errorMessage.set(error.message);
          }
        })
      )
      .subscribe();
    this.clearErrorMessage();
  }

  onLoginFormSubmitted(loginForm: NgForm) {
    if (loginForm.valid) {
      const login = this.loginCredentials;
      this.store.dispatch(AuthActions.startLogin({ login }));
    }
    this.error$
      .pipe(
        tap((error) => {
          if (error) {
            this.errorMessage.set(error.message);
          }
        })
      )
      .subscribe();
    this.clearErrorMessage();
  }
}
