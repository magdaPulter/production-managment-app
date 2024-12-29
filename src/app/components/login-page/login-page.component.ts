import { Component, signal, WritableSignal } from '@angular/core';
import { RegisterModel } from '../../models/register.model';
import { LoginModel } from '../../models/login.model';
import { FormsModule, NgForm } from '@angular/forms';

export enum LoginState {
  LOGIN = 'login',
  REGISTER = 'register',
}
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
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

  changeLoginState(loginState: LoginState) {
    this.loginState.set(loginState);
  }
  onLoginFormSubmitted(loginForm: NgForm) {}
}
