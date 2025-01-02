import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly authService = inject(AuthService);
  readonly currentLoginState = this.authService.currentLoginState;

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        tap((user) => {
          if (user) {
            this.currentLoginState.set(user);
          } else {
            this.currentLoginState.set(null);
          }
        })
      )
      .subscribe();
  }

  logOut() {
    this.authService.logout();
  }
}
