import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() logOutEmitted: EventEmitter<void> = new EventEmitter<void>();

  logOut() {
    this.logOutEmitted.emit();
  }
}
