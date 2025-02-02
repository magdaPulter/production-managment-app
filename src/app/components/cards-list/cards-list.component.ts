import { Component, Input } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
})
export class CardsListComponent {
  @Input() listItems!: InventoryViewModel[];
}
