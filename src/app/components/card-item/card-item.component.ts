import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatCardModule, FormsModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  @Input() item!: InventoryViewModel;
  roasted: number = 0;
}
