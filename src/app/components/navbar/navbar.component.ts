import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ transform: 'translateX(120%)' }),
        animate('1s ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('1s ease-out', style({ transform: 'translateX(120%)' })),
      ]),
    ]),
  ],
})
export class NavbarComponent {
  @Output() logOutEmitted: EventEmitter<void> = new EventEmitter<void>();
  readonly isMenuOpen: WritableSignal<boolean> = signal(false);
  logOut() {
    this.logOutEmitted.emit();
  }

  onButtonclicked() {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
}
