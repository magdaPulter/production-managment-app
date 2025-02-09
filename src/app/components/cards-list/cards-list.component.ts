import { Component, Input } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { ProductionsItemCounted } from '../../models/productionsItem.model';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
})
export class CardsListComponent {
  @Input() productionsItems!: ProductionsItemCounted[];
}
