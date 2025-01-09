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
import { BehaviorSubject, debounceTime, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export enum LoginState {
  LOGIN = 'login',
  REGISTER = 'register',
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
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
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

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
      this.authService
        .register(
          this.registerCredentials.email,
          this.registerCredentials.password
        )
        .subscribe({
          next: () => this.router.navigateByUrl('/'),
          error: () =>
            this.errorMessage.set('This email is already registered!'),
        });
      this.clearErrorMessage();
    }
  }

  onLoginFormSubmitted(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService
        .login(this.loginCredentials.email, this.loginCredentials.password)
        .subscribe({
          next: () => this.router.navigateByUrl('/'),
          error: () => this.errorMessage.set('Login or password are incorrect'),
        });
      this.clearErrorMessage();
    }
  }
}
