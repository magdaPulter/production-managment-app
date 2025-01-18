import { Component } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
})
export class CardsListComponent {}
